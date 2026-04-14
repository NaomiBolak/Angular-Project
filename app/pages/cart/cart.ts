import { Component } from '@angular/core';
import { CommonModule, AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Observable, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TrackingService } from '../../services/users.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart$: Observable<(Product & { quantity: number })[]>;
  totalCartPrice$: Observable<number>;
 

  constructor(public cartService: CartService , private TrackingService: TrackingService) {
    this.cart$ = this.cartService.cart$;
    

    this.totalCartPrice$ = this.cart$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
    );
  }

 
  getTotalCartPrice(): number {
    return this.cartService.getTotalPrice();
  }


  minusOne(product: Product) {
    this.TrackingService.logAction('הפחתת כמות מוצר', product.name);
    this.cartService.removeOne(product.id);
  }

  plusOne(product: Product) {
    this.TrackingService.logAction('הוספת כמות מוצר', product.name);
    this.cartService.addToCart(product);
  }

  removeItem(product: Product) {
   this.TrackingService.logAction('הסרת מוצר', product.name); 
   this.cartService.removeProduct(product.id)
  }
}