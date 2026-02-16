import { Component, AfterViewInit } from '@angular/core';
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

  ngAfterViewInit() {
    // Ahora 'gsap.timeline' debería reconocerse correctamente
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-title', { opacity: 0, x: -50, duration: 1 })
      .from('.hero-description', { opacity: 0, x: -50, duration: 1 }, '-=0.6')
      .from('.hero-actions', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
      .from('.hero-image-wrapper', { opacity: 0, scale: 0.9, duration: 1.2 }, '-=1');
  }
}