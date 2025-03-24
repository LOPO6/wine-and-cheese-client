import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //read domain of API form env file, make available in this file for all methods
  serverUrl: string = environment.serverUrl;
  


  //username var shared across components
  private usernameSource = new BehaviorSubject<string |   null>(null);
  username = this.usernameSource.asObservable(); //other components can subscribe or watch this value

  setUsername(username: string): void{
    this.usernameSource.next(username);
  }

  //remove global username on logout
  clearUsername(): void{
    this.usernameSource.next(null);
  }

  constructor(private http: HttpClient) { }

  register(user: any){
    return this.http.post(`${this.serverUrl}/users/register`, user);
  }

  login(user: any){
    //withCredentials: true param allows browser to receive token w/JWT back from API
    return this.http.post(`${this.serverUrl}/users/login`, user, {withCredentials: true});
  }

  logout(){
    // pass authToken to API so server can remove it
    return this.http.get(`${this.serverUrl}/users/logout`, {withCredentials: true});
  }
}

