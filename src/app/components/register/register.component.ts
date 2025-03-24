import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string |undefined;
  password: string|undefined;
  confirm: string|undefined;
  message: string = 'Please choose a strong password';
  messageClass: string = 'alert alert-info'
  apiResponse: any;

  constructor(private authService: AuthService){}

  register(){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    //confirm password match
    if(this.password != this.confirm){
      this.message = 'Passowrd does not match';
      this.messageClass = 'alert alert-danger'
      return;
    }
    else if (this.password != undefined && regex.test(this.password) === false){
      this.message = 'Invalid Password';
      this.messageClass = 'alert alert-danger'
      return;
    }
    

    // create new user json object
    const user = {
      username: this.username,
      password: this.password
    };

    // call service, which calls API, wait for response
    return this.authService.register(user).subscribe({
      next: response=>{
        this.apiResponse = response;
        //console.log(this.apiResponse);
        this.message = 'Registration successful';
        this.messageClass = 'alert alert-success';
      },
      error: err => {
        this.message = err.message;
        this.messageClass = 'alert alert-danger'
      }
    })
  }

}
