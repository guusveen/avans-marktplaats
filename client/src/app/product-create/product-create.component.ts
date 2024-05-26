// product-create.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  name: string = '';
  description: string = '';
  price: number = 0;

  constructor(private productService: ProductService) {}

  onSubmit() {
    const product = {
      name: this.name,
      description: this.description,
      price: this.price
    };

    this.productService.createProduct(product).subscribe(res => {
      console.log('Product created', res);
    });
  }
}
