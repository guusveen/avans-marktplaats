// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  createProduct(productData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `${token}` 
    });
    console.log('Token:', token); // Log de token
    console.log('Headers:', headers); // Log de headers
    return this.http.post(this.apiUrl, productData, { headers });
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
