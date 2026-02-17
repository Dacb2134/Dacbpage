import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importaciones de Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// 1. NUEVO: Importar Firestore
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environments';

// TUS CREDENCIALES (Déjalas tal cual las tienes o impórtalas de environment)


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),

    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)), // O tu variable firebaseConfig
    provideAuth(() => getAuth()),
    
    // 2. NUEVO: Proveedor de Base de Datos
    provideFirestore(() => getFirestore()) 
  ]
};