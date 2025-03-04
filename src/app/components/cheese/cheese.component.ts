import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CheeseService } from '../../services/cheese.service';
import { FormsModule } from '@angular/forms';

// export class Cheese {
//   _id: string | undefined;
//   name: string | undefined;
// }

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

  constructor(private service: CheeseService) {}

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
    this.name = undefined;
    this.price = undefined;
    this.stinkRating = undefined;
    this.category = undefined;
  }

  ngOnInit() {
    this.getCheeses();
  }

  // CHEESES: Cheese[] = [
  //   { _id: 'abc123', name: 'Cheddar' },
  //   { _id: 'def456', name: 'Gouda' },
  //   { _id: 'ghi789', name: 'Feta' }
  // ];
}