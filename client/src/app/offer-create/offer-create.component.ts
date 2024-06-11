import { Component, Input } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})
export class OfferCreateComponent {
  @Input() productId!: string;
  price: number = 0;

  constructor(private productService: ProductService) {}

  onSubmit() {
    const newOffer = {
      price: this.price
    };

    this.productService.createOffer(this.productId, newOffer).subscribe(res => {
      console.log('Offer created', res);
      this.resetForm();
    });
  }

  resetForm() {
    this.price = 0;
  }
}
