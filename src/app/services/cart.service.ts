import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // 1. Estado del Carrito (Lista de productos)
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  // 2. Estado del Panel Lateral (Abierto/Cerrado)
  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  // AGREGAR AL CARRITO
  addToCart(item: CartItem) {
    const currentItems = this.cartItems.value;
    
    // Buscamos si ya existe el producto con el MISMO color
    const existingItem = currentItems.find(p => p.id === item.id && p.color === item.color);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }
    
    this.openCart(); // Abrimos el carrito automáticamente al agregar
  }

  // ELIMINAR DEL CARRITO
  removeFromCart(productId: number, color: string) {
    const currentItems = this.cartItems.value.filter(item => !(item.id === productId && item.color === color));
    this.cartItems.next(currentItems);
  }

  // CONTROL DEL PANEL LATERAL
  openCart() { this.isDrawerOpenSubject.next(true); }
  closeCart() { this.isDrawerOpenSubject.next(false); }
  toggleCart() { this.isDrawerOpenSubject.next(!this.isDrawerOpenSubject.value); }

  // CÁLCULOS
  getTotal() {
    return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
  }
}