import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CheeseService } from '../../services/cheese.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

 export class Cheese {
   _id: string | undefined;
   name: string | undefined;
   price: number | undefined;
   stinkRating: number | undefined;
   category: string | undefined;
 }

@Component({
  selector: 'app-cheese',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './cheese.component.html'
})
export class CheeseComponent implements OnInit {

  CHEESES: any;
  _id: string | undefined;
  name: string | undefined;
  price: number | undefined;
  stinkRating: number | undefined;
  category: string | undefined;
  username: string | null = null;

  constructor(private service: CheeseService, private authService: AuthService) {}

  getCheeses(): void {
    this.service.getCheeses().subscribe(response => {
      this.CHEESES = response;
    })
  }

  addCheese(): void {
    // create new object from form properties
    let newCheese = {
      name: this.name,
      price: this.price,
      stinkRating: this.stinkRating,
      category: this.category
    };

    // pass to service
    this.service.addCheese(newCheese).subscribe(response => {
      this.getCheeses();
      this.resetForm();
    });
  }

  resetForm(): void {
    this._id = undefined;
    this.name = undefined;
    this.price = undefined;
    this.stinkRating = undefined;
    this.category = undefined;
  }

  ngOnInit() {
    this.getCheeses();


    //check auth service for global username so we can show/hide links
    this.authService.username.subscribe((username)=>{
      this.username = username
    });
  }

  selectCheese(cheese: Cheese){
    this._id = cheese._id;
    this.name = cheese.name;
    this.price = cheese.price;
    this.stinkRating = cheese.stinkRating;
    this.category = cheese.category;


  }

  deleteCheese(_id: string){
    if(confirm('Are you sure you want to delete this cheese?')){
    this.service.deleteCheese(_id).subscribe(response=>{
      this.getCheeses();
      this.resetForm();


    });
  }
  }

  updateCheese(): void{
    let cheese={
      _id: this._id,
      name: this.name,
      price: this.price,
      stinkRatingthis: this.stinkRating,
      category: this.category


    }
    this.service.updateCheese(cheese).subscribe(response=>{
      this.getCheeses();
      this.resetForm();
    })


  }

  // CHEESES: Cheese[] = [
  //   { _id: 'abc123', name: 'Cheddar' },
  //   { _id: 'def456', name: 'Gouda' },
  //   { _id: 'ghi789', name: 'Feta' }
  // ];
}