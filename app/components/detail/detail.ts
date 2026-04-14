import { Component, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import {TrackingService}from '../../services/users.service'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class Detail {


  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<Detail>,
    private cartService: CartService,
    private TrackingService:TrackingService
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.TrackingService.logAction('הוספה לסל', this.product.name);
    this.dialogRef.close();
  }

  close() {
    this.TrackingService.logAction('סגירת חלונית מוצר',this.product.name)
    this.dialogRef.close();
  }
}