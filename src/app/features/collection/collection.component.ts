import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';


@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  cartService = inject(CartService);

  // TUS 3 PRODUCTOS ESTRELLA
  products: Product[] = [
    {
      id: 1,
      name: 'Classic Carbon',
      price: 25.00,
      description: 'La definición de elegancia. Cuero genuino con textura de fibra de carbono y acabado mate.',
      image: 'https://cdn.pixabay.com/photo/2016/11/23/18/16/wallet-1854181_1280.jpg', 
      colors: ['#1a1a1d', '#3e2723'],
      colorNames: {'#1a1a1d': 'Carbono', '#3e2723': 'Expresso'},
      selectedColor: '#1a1a1d'
    },
    {
      id: 2,
      name: 'Slim Gold Edition',
      price: 35.00,
      description: 'Diseño ultra delgado. Detalles bañados en dorado y costura reforzada invisible.',
      image: 'https://cdn.pixabay.com/photo/2015/09/05/22/47/wallet-926065_1280.jpg',
      colors: ['#c7a17a', '#5d4037'],
      colorNames: {'#c7a17a': 'Gold', '#5d4037': 'Tabaco'},
      selectedColor: '#c7a17a'
    },
    {
      id: 3,
      name: 'Executive Navy',
      price: 45.00,
      description: 'Para el hombre moderno. Protección RFID y compartimentos secretos.',
      image: 'https://cdn.pixabay.com/photo/2019/07/02/05/52/wallet-4311663_1280.jpg',
      colors: ['#263238', '#212121'],
      colorNames: {'#263238': 'Navy', '#212121': 'Onyx'},
      selectedColor: '#263238'
    }
  ];

  selectColor(product: Product, color: string) {
    product.selectedColor = color;
  }

  addToCart(product: Product) {
    const colorHex = product.selectedColor || product.colors[0];
    
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colorNames[colorHex],
      quantity: 1
    };
    
    this.cartService.addToCart(item);
  }
}