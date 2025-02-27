import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

export class Cheese{
  _id: string | undefined;
  name: string | undefined;
}

@Component({
  selector: 'app-cheese',
  imports: [NgFor],
  templateUrl: './cheese.component.html'
})
export class CheeseComponent {
  CHEESES: Cheese[] =[
    {_id: 'abc123', name: 'Cheddar'},
    {_id: 'def456', name: 'Gouda'},
    {_id: 'ghi789', name: 'Feta'}
  ];

}
