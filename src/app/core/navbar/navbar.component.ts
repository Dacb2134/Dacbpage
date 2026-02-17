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
  isUserDropdownOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() { 
    this.isMenuOpen = !this.isMenuOpen; 
  }

  closeMenu() { 
    this.isMenuOpen = false; 
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  async logout() {
    await this.authService.logout();
    this.isUserDropdownOpen = false;
    this.router.navigate(['/']);
  }

  comprarAhora() {
    // Suscribirse una vez para ver el estado
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log("Usuario logueado -> Ir a checkout/WhatsApp");
        // Aquí tu lógica futura
      } else {
        this.router.navigate(['/login']);
      }
    }).unsubscribe();
    
    this.closeMenu(); // Cerrar menú móvil si estaba abierto
  }
}