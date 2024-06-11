import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve products from the API via GET', () => {
    const dummyProducts = [
      { name: 'Product 1', description: 'Description 1', price: 100, image: 'image1.jpg' },
      { name: 'Product 2', description: 'Description 2', price: 200, image: 'image2.jpg' }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });
});
