import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a user', () => {
    const dummyUser = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    service.register(dummyUser).subscribe(response => {
      expect(response.username).toEqual('testuser');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/users/register');
    expect(req.request.method).toBe('POST');
    req.flush({ ...dummyUser, id: '1' });
  });
});