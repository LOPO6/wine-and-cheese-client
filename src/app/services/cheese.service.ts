import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheeseService {

  serverUrl: string = environment.serverUrl
  //injecting HttpClient dependency at construct time for API calls
  constructor(private http: HttpClient) { }

  getCheeses(){
    return this.http.get(`${this.serverUrl}/cheeses`);
  }


  addCheese(cheese: any){
    return this.http.post(`${this.serverUrl}/cheeses`, cheese)
  }
}
