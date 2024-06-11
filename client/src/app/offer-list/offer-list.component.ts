import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  @Input() productId!: string;
  product$: Observable<any>;

  constructor(private productService: ProductService) {
    this.product$ = new Observable();
  }

  ngOnInit(): void {
    this.product$ = this.productService.getProducts().pipe(
      map(products => products.find((product: { id: string; }) => product.id === this.productId)),
      map(product => {
        if (product) {
          product.offers = product.offers.map((offer: any) => {
            offer.timeLeft = this.calculateTimeLeft(product.endTime);
            return offer;
          });
        }
        return product;
      })
    );

    interval(1000).subscribe(() => {
      this.product$ = this.productService.getProducts().pipe(
        map(products => products.find((product: { id: string; }) => product.id === this.productId)),
        map(product => {
          if (product) {
            product.offers = product.offers.map((offer: any) => {
              offer.timeLeft = this.calculateTimeLeft(product.endTime);
              return offer;
            });
          }
          return product;
        })
      );
    });
  }

  calculateTimeLeft(endTime: Date) {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const timeLeft = end - now;

    if (timeLeft < 0) {
      return 'Offer expired';
    }

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
