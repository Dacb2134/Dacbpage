import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isRegistering = false; 
  email = '';
  password = '';
  errorMessage = '';

  async onSubmit() {
    this.errorMessage = ''; 

    try {
      if (this.isRegistering) {
        // MODO REGISTRO
        await this.authService.register(this.email, this.password);
        // Si sale bien, Firebase loguea automático. Redirigimos al Home.
        this.router.navigate(['/']); 
      } else {
        // MODO LOGIN
        await this.authService.login(this.email, this.password);
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      // Manejo de errores básicos (puedes mejorarlo luego)
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Este correo ya está registrado.';
      } else if (error.code === 'auth/invalid-credential') {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      } else {
        this.errorMessage = 'Ocurrió un error. Intenta de nuevo.';
      }
    }
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }
}