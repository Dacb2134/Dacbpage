import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  user$ = this.authService.user$;

  isScrolled = false;
  isMenuOpen = false;
  isUserDropdownOpen = false; // NUEVO: Controla el menú de usuario

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }

  // NUEVO: Alternar el menú de usuario
  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  // NUEVO: Cerrar sesión
  async logout() {
    await this.authService.logout();
    this.isUserDropdownOpen = false; // Cerrar el menú
    this.router.navigate(['/']); // Ir al inicio
  }

  comprarAhora() { /* Tu lógica existente... */ }
}