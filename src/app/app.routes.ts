import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component'; // O la ruta donde tengas tu login
import { ProfileComponent } from './features/profile/profile.component'; // 1. IMPORTAR EL PERFIL
import { CollectionComponent } from './features/collection/collection.component';

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
    path: 'perfil',  // 2. NUEVA RUTA PARA EL PERFIL
    component: ProfileComponent 
  },
  { path: 'coleccion', component: CollectionComponent },
  
  // Wildcard (siempre al final)
  { 
    path: '**', 
    redirectTo: 'inicio' 
  }
];