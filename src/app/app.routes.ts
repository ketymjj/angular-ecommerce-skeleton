
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./products/pages/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'product/:id', loadComponent: () => import('./products/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'cart', loadComponent: () => import('./products/pages/cart/cart.component').then(m => m.CartComponent) },
  { path: 'checkout', canActivate: [AuthGuard], loadComponent: () => import('./orders/pages/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'orders', canActivate: [AuthGuard], loadComponent: () => import('./orders/pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent) },
  { path: 'login', loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin', loadComponent: () => import('./admin/pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: '**', redirectTo: '' }
];
