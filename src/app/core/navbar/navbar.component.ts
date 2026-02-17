import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import { take } from 'rxjs/operators'; 
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
  cartCount = 0;
  
  isScrolled = false;
  isMenuOpen = false;
  isUserDropdownOpen = false;

  ngOnInit() {
    // Escuchar cambios en el carrito para el numerito rojo
    this.cartService.cart$.subscribe(items => {
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

  // === AQUÍ ESTÁ LA CORRECCIÓN ===
  handleCartClick() {
    // Usamos pipe(take(1)) para ver el estado del usuario UNA vez y ejecutar
    this.authService.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        // Si está logueado, abrimos/cerramos el carrito
        console.log("Usuario logueado: Abriendo carrito...");
        this.cartService.toggleCart();
      } else {
        // Si no, al login
        console.log("No logueado: Redirigiendo a login...");
        this.router.navigate(['/login']);
      }
    });
    
    // Cerramos el menú móvil por si acaso se dio clic desde ahí
    this.closeMenu();
  }

  scrollToContact() {
    if (this.router.url === '/inicio' || this.router.url === '/') {
       const contactSection = document.getElementById('contacto');
       if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeMenuAndScroll() {
    this.closeMenu();
    setTimeout(() => this.scrollToContact(), 300);
  }
}