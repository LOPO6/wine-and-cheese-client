import { Routes } from '@angular/router';
import { CheeseComponent } from './components/cheese/cheese.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'cheese', component: CheeseComponent },
    {path: '', component: HomeComponent}
];
