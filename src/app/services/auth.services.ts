import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Variable reactiva: Nos dice si hay alguien logueado en tiempo real
  user$: Observable<User | null> = user(this.auth);

  constructor() { }

  // 1. Registrar usuario nuevo
  register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // 2. Iniciar sesión
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // 3. Cerrar sesión
  logout() {
    return signOut(this.auth);
  }
}