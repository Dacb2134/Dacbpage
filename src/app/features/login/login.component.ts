import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/']); // Al Home después de loguear
    } catch (error) {
      console.error('Error al loguear:', error);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}