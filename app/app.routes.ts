import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Cart } from './pages/cart/cart';
import { Products } from './pages/products/products';
import { Users } from './pages/users/users';
import { Payment } from './components/payment/payment';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'cart', component: Cart },
    { path: 'products', component: Products },
    { path: 'users', component: Users },
    { path: 'payment', component: Payment },
    { path: 'user-tracking', component: Users },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

