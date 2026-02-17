import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = false;
  isMenuOpen = false;

  // Detecta el scroll para cambiar el fondo a negro
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Alternar menú hamburguesa
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Cerrar menú al hacer clic en un enlace
  closeMenu() {
    this.isMenuOpen = false;
  }
}