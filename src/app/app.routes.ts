import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';


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
  { 
    path: 'login',  
    component: LoginComponent 
  },
  
  { 
    path: '**', 
    redirectTo: 'inicio' 
  }
];