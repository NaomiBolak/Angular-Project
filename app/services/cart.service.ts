import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  
  private cart: (Product & { quantity: number })[] = [];
 
  private cartSubject = new BehaviorSubject<(Product & { quantity: number })[]>([]);

  public cart$ = this.cartSubject.asObservable(); 

  addToCart(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]);
  }

 
  get totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

  getCart() {
    return this.cart;
  }
 getTotalPrice(): number {
  return this.cart.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);
  }

  removeOne(productId: number) {
    const existing = this.cart.find(p => p.id === productId);
    if (existing) {
      existing.quantity--;
      if (existing.quantity <= 0) {
        this.cart = this.cart.filter(p => p.id !== productId);
      }
      this.cartSubject.next([...this.cart]);
    }
  }
removeProduct(productId: number) {
  this.cart = this.cart.filter(p => p.id !== productId); 
    this.cartSubject.next([...this.cart]);
}
  clearCart() {   
    this.cart = [];
    this.cartSubject.next([]);
}

}