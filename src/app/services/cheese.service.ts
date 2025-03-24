import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheeseService {

  serverUrl: string = environment.serverUrl;

  // injecting HttpClient dependency at construct time for API calls
  constructor(private http: HttpClient) { }

  getCheeses() {
    return this.http.get(`${this.serverUrl}/cheeses`);
  }

  addCheese(cheese: any) {
    return this.http.post(`${this.serverUrl}/cheeses`, cheese, {withCredentials: true});
  }

  deleteCheese(_id: string){
    return this.http.delete(`${this.serverUrl}/cheeses/${_id}`, {withCredentials: true});
  }

  updateCheese(cheese: any){
    return this.http.put(`${this.serverUrl}/cheeses/${cheese._id}`, cheese, {withCredentials: true});
  }
}
