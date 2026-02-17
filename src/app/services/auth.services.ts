import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Observable: Muestra el usuario actual (o null si no hay nadie)
  user$: Observable<User | null> = user(this.auth);

  constructor() { }

  // 1. Iniciar sesión con Google (Popup)
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // 2. Cerrar sesión
  logout() {
    return signOut(this.auth);
  }
}