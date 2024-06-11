import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  username: string = '';
  messageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      this.username = product.user ? product.user.username : 'Unknown'; // Zorg ervoor dat de gebruiker is opgenomen in de productgegevens
    });
  }

  sendMessage() {
    const receiverId = this.product.user;
    const productId = this.product._id;
    this.messageService.sendMessage(receiverId, this.messageContent, productId).subscribe(
      response => {
        console.log('Message sent successfully', response);
        this.messageContent = '';
      },
      error => {
        console.error('Error sending message', error);
      }
    );
  }
}