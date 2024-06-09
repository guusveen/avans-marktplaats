// product-create.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  name: string = '';
  description: string = '';
  price: number = 0;
  image: File | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  createProduct() {
    const productData = new FormData();
    productData.append('name', this.name);
    productData.append('description', this.description);
    productData.append('price', this.price.toString());
    if (this.image) {
      productData.append('image', this.image, this.image.name);
    }

    this.productService.createProduct(productData).subscribe(
      response => {
        console.log('Product created successfully', response);
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Error creating product', error);
      }
    );
  }
}
