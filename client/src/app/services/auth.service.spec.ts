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
    localStorage.removeItem('token'); // Clean up the token after each test
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

  it('should log in a user', () => {
    const dummyUser = { email: 'test@example.com', password: 'password123' };
    const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // Example of a valid JWT

    service.login(dummyUser).subscribe(response => {
      expect(response.token).toEqual(dummyToken);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/users/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: dummyToken });

    // Set the token in localStorage to simulate a successful login
    localStorage.setItem('token', dummyToken);

    // Verify that the token is set correctly
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.getUsername()).toEqual('John Doe'); // Assuming the dummy token contains this username
  });
});
