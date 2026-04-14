import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { TrackingService } from '../../services/users.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment {
  paymentData = {
    fullName: '',
    address: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  };

  constructor(
    public cartService: CartService,
    private trackingService: TrackingService,
    private apiService: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.paymentData.fullName || !this.paymentData.address || !this.paymentData.cardNumber) {
      alert('נא למלא את כל פרטי התשלום והמשלוח כדי להמשיך');
      return;
    }

    const cartItems = this.cartService.getCart();
    const totalAmount = this.cartService.getTotalPrice();

    this.trackingService.logAction('ביצוע הזמנה', `לקוח: ${this.paymentData.fullName}, סכום: ${totalAmount}$`);

    const orderPayload = {
      customerDetails: {
        name: this.paymentData.fullName,
        address: this.paymentData.address
      },
      orderItems: cartItems,
      total: totalAmount,
      timestamp: new Date()
    };

    this.apiService.addItem('orders', orderPayload).subscribe({
      next: (res) => {
        console.log('Success', res);
      },
      error: (err) => {
        console.log('Offline mode', err);
      }
    });

    alert(`תודה ${this.paymentData.fullName}!\nהזמנתך בסך ${totalAmount}$ התקבלה ותשלח לכתובת: ${this.paymentData.address}`);

    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }
}