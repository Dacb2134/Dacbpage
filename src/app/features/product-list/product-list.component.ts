import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Animación de cascada (Stagger)
    gsap.from('.product-card', {
      scrollTrigger: {
        trigger: '.product-grid', // Se activa cuando el grid entra en pantalla
        start: 'top 85%', // Empieza un poco antes de llegar abajo
        toggleActions: 'play none none reverse' // Se reproduce al bajar, se reversa al subir
      },
      y: 100, // Vienen desde abajo 100px
      opacity: 0, // Aparecen de la nada
      duration: 1,
      stagger: 0.2, // Retraso de 0.2s entre cada tarjeta
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
}