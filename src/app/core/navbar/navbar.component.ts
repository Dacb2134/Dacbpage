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
    this.checkAuthAndRedirect(() => {
      console.log("Usuario logueado -> Ir a checkout/WhatsApp");
      // Aquí iría tu lógica de compra
    });
  }

  // NUEVA FUNCIÓN: Manejar clic en el carrito
  handleCartClick() {
    this.checkAuthAndRedirect(() => {
      console.log("Abriendo carrito...");
      // Aquí iría la lógica para mostrar el carrito lateral
    });
  }

  // Helper para no repetir código
  private checkAuthAndRedirect(callback: () => void) {
    this.authService.user$.subscribe(user => {
      if (user) {
        callback();
      } else {
        this.router.navigate(['/login']);
      }
    }).unsubscribe();
    this.closeMenu();
  }
}