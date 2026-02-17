import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  cartService = inject(CartService); 
  router = inject(Router);
  
  user$ = this.authService.user$;
  
  isScrolled = false;
  isMenuOpen = false;
  isUserDropdownOpen = false;
  
  // Variable para el contador del carrito
  cartCount = 0;

  ngOnInit() {
    // 3. SUSCRIBIRSE A LOS CAMBIOS DEL CARRITO
    this.cartService.cart$.subscribe(items => {
      // Sumamos las cantidades de todos los items
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }
  toggleUserDropdown() { this.isUserDropdownOpen = !this.isUserDropdownOpen; }

  async logout() {
    await this.authService.logout();
    this.isUserDropdownOpen = false;
    this.router.navigate(['/']);
  }

  comprarAhora() {
    this.checkAuthAndRedirect(() => {
      // Si está logueado, abrimos el carrito directamente
      this.cartService.openCart();
    });
  }

  handleCartClick() {
    this.checkAuthAndRedirect(() => {
      // Abrimos el panel lateral del carrito
      this.cartService.toggleCart();
    });
  }

  private checkAuthAndRedirect(callback: () => void) {
    // Usamos 'take(1)' o nos desuscribimos manualmente, pero aquí una suscripción simple funciona
    const sub = this.authService.user$.subscribe(user => {
      if (user) {
        callback();
      } else {
        this.router.navigate(['/login']);
      }
      // Importante: desuscribirse para evitar fugas de memoria si se llamara muchas veces
      sub.unsubscribe();
    });
    this.closeMenu();
  }
}