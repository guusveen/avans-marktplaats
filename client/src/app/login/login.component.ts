// login.component.ts
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.userService.login(user).subscribe(res => {
      console.log('User logged in', res);
      localStorage.setItem('token', res.token);
    });
  }
}