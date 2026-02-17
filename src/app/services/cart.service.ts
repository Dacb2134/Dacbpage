import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.services'; 
import { CartItem } from '../models/cart-item.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Estados
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  private isDrawerOpenSubject = new BehaviorSubject<boolean>(false);
  isDrawerOpen$ = this.isDrawerOpenSubject.asObservable();

  private userId: string | null = null;

  constructor() {
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        console.log("👤 [CartService] Usuario logueado:", user.email);
        this.userId = user.uid;
        await this.loadCartFromFirebase(user.uid);
      } else {
        console.log("👋 [CartService] Usuario desconectado.");
        this.userId = null;
        this.cartItems.next([]);
      }
    });
  }

  // --- FIREBASE ---
  private async loadCartFromFirebase(uid: string) {
    try {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data()['cart']) {
        console.log("📥 [CartService] Carrito recuperado:", docSnap.data()['cart']);
        this.cartItems.next(docSnap.data()['cart']);
      }
    } catch (e) { console.error("Error cargando carrito:", e); }
  }

  private async saveCartToFirebase(items: CartItem[]) {
    if (!this.userId) {
      console.warn("⚠️ No se puede guardar: No hay userId.");
      return;
    }
    try {
      const docRef = doc(this.firestore, 'users', this.userId);
      await setDoc(docRef, { cart: items }, { merge: true });
      console.log("💾 [CartService] Guardado en Firebase exitoso.");
    } catch (e) { console.error("Error guardando carrito:", e); }
  }

  // --- ACCIONES ---
  addToCart(item: CartItem) {
    console.log("📢 [CartService] Recibida orden de agregar:", item.name);
    
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(p => p.id === item.id && p.color === item.color);
    let newCart: CartItem[];

    if (existingItem) {
      newCart = currentItems.map(p => 
        (p.id === item.id && p.color === item.color) ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      newCart = [...currentItems, { ...item, quantity: 1 }];
    }

    this.cartItems.next(newCart);
    this.saveCartToFirebase(newCart);
    this.openCart();
  }

  removeFromCart(productId: number, color: string) {
    const newCart = this.cartItems.value.filter(item => !(item.id === productId && item.color === color));
    this.cartItems.next(newCart);
    this.saveCartToFirebase(newCart);
  }

  // --- VISUAL ---
  openCart() { this.isDrawerOpenSubject.next(true); }
  closeCart() { this.isDrawerOpenSubject.next(false); }
  toggleCart() { this.isDrawerOpenSubject.next(!this.isDrawerOpenSubject.value); }

  getTotal() { return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0); }
  getCount() { return this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0); }
}