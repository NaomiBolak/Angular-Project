import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { Detail } from '../../components/detail/detail';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CategoryColor } from '../../pipes/categoryColor';
import { Category } from '../../models/category';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TrackingService } from '../../services/users.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, CategoryColor, MatDialogModule, RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  products: Product[] = [];
  cart$: Observable<(Product & { quantity: number })[]>;

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private trackingService: TrackingService,
    private apiService: ApiService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    
    this.products = [
      { id: 1, name: 'חולצה לבנה קלאסית', description: 'חולצה אלגנטית', price: 25.99, category: Category.Shirt, img: 'img/image.png' },
      { id: 2, name: 'חצאית שחורה', description: 'חצאית אופנתית', price: 39.90, category: Category.Skirt, img: 'img/skirt.png' },
      { id: 3, name: 'שמלה פרחונית', description: 'שמלה קלילה', price: 59.50, category: Category.Dress, img: 'img/dress.png' },
      { id: 4, name: 'סט חולצה וחצאית', description: 'סט אופנתי', price: 75.00, category: Category.Set, img: 'img/set.png' }
    ];

    this.apiService.getItems('products').subscribe({
      next: (dataFromApi) => {
        if (dataFromApi && dataFromApi.length > 0) {
          this.products = dataFromApi;
          this.trackingService.logAction('טעינת נתונים מ-API', 'הצלחה');
        }
      },
      error: (err) => {
        console.log('API לא זמין, עובדים עם נתונים מקומיים');
        this.trackingService.logAction('ניסיון קריאה ל-API', 'נכשל - עבודה מקומית');
      }
    });
  }

  openProductDialog(product: Product) {
    this.trackingService.logAction('צפיה בפרטי מוצר', product.name);
    this.dialog.open(Detail, { data: product });
  }

  get totalCartPrice(): number {
    return this.cartService.getTotalPrice();
  }

  addToCart(product: Product) {
    this.trackingService.logAction('הוספה לסל', product.name);
    console.log('הוספת מוצר לסל:', product);
    this.cartService.addToCart(product);
  }
}