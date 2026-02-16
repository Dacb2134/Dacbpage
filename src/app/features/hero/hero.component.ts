import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  // Referencia directa a la imagen para animarla
  @ViewChild('walletImage') walletImage!: ElementRef;

  ngAfterViewInit() {
    // 1. Animación de Entrada (Texto y Botones)
    gsap.from('.hero-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.2
    });

    // 2. Animación FLOTANTE (Loop Infinito)
    // Usamos yoyo: true para que suba y baje suavemente
    gsap.to(this.walletImage.nativeElement, {
      y: -20,             // Sube 20px
      duration: 2.5,      // Tarda 2.5 segundos
      repeat: -1,         // Infinito
      yoyo: true,         // Va y vuelve
      ease: "sine.inOut"  // Movimiento muy suave (tipo respiración)
    });
  }
}