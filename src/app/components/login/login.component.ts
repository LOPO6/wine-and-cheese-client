import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  message: string = 'Please enter your credentials';
  messageClass: string = 'alert alert-info';
  apiResponse: any;

  constructor(private authService: AuthService, private router: Router) { }
  
  login() {
    // create user json from form
    const user = { 
      username: this.username,
      password: this.password
    }

    // try to login using service then api, wait for response
    return this.authService.login(user).subscribe({
      next: response => {
        this.apiResponse = response;
        //console.log(this.apiReponse);
        // set global username property in authService
        this.authService.setUsername(this.apiResponse.username);

        // redirect to cheese page
        this.router.navigate(['/cheese']);
      },
      error: err => {
        this.message = 'Invalid Login';
        this.messageClass = 'alert alert-danger';
      }
    });
  };
}
