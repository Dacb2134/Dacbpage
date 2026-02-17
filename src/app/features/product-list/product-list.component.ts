import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngAfterViewInit() {
    // Animación de cascada (Stagger)
    gsap.from('.product-card', {
      scrollTrigger: {
        trigger: '.product-grid', 
        start: 'top 85%', 
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0, 
      duration: 1,
      stagger: 0.2, 
      ease: 'power3.out'
    });

    // Animación del Título
    gsap.from('.section-header', {
      scrollTrigger: {
        trigger: '.product-section',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1
    });
  }

  // NUEVO: Función protegida para agregar al carrito
  agregarAlCarrito(producto: string) {
    this.authService.user$.subscribe(user => {
      if (user) {
        // Usuario logueado: Procedemos
        console.log(`Producto agregado: ${producto}`);
        // Aquí iría tu lógica real del carrito (ej: CartService.add(...))
      } else {
        // Usuario NO logueado: Al login
        this.router.navigate(['/login']);
      }
    }).unsubscribe();
  }
}