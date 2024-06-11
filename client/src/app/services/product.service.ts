import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';
  private offerUrl = 'http://localhost:5000/api/offers';

  constructor(private http: HttpClient) {}

  createProduct(productData: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); // Debugging headers
    return this.http.post(this.apiUrl, productData, { headers });
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createOffer(productId: string, offerData: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); // Debugging headers
    return this.http.post(`${this.apiUrl}/${productId}/offers`, offerData, { headers });
  }
}
