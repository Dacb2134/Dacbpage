import { Routes } from '@angular/router';
import { HeroComponent } from './features/hero/hero.component';
import { ProductListComponent } from './features/product-list/product-list.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'inicio', 
    pathMatch: 'full' 
  },
  { 
    path: 'inicio', 
    component: HeroComponent 
  }
];