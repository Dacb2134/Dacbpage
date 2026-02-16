import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component'; 

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'inicio', 
    pathMatch: 'full' 
  },
  { 
    path: 'inicio', 
    component: HomeComponent 
  },
  // (Opcional) Si quisieras una página solo para ver productos aparte:
  // { path: 'catalogo', component: ProductListComponent } 
];