import { Component, inject } from '@angular/core';
import { NgFor, CurrencyPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../products/services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Location } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [NgFor, CurrencyPipe, NgIf],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart = inject(CartService);
  private orders = inject(OrderService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private location = inject(Location);

  goBack() {
    this.location.back();
  }

  finish() {
    const items = this.cart.getItems().map(i => ({
      productId: i.product.id,
      quantity: i.quantity,
      unitPrice: i.product.price
    }));

    const totalAmount = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const userId = this.authService.getUsername();

    if (!userId) {
      alert('Usuário não autenticado. Faça login novamente.');
      this.router.navigateByUrl('/login');
      return;
    }

    const order = {
      orderDate: new Date().toISOString(),
      customerId: userId,
      totalAmount
    };

    this.orders.create(order).subscribe({
      next: (createdOrder: any) => {
        if (!createdOrder || !createdOrder.id) {
          console.error('Erro: ordem criada sem ID', createdOrder);
          alert('Erro: a ordem não retornou um ID válido.');
          return;
        }

        const orderItems = items.map(i => ({ ...i, orderId: createdOrder.id }));

        this.orders.createItems(orderItems).subscribe({
          next: () => {
            this.cart.clear();
            this.router.navigateByUrl('/orders');
          },
          error: (err) => {
            console.error('Falha ao criar itens do pedido', err);
            alert(err.status === 401 ? 'Sessão expirada. Faça login novamente.' : 'Falha ao criar itens do pedido');
            if (err.status === 401) this.router.navigateByUrl('/login');
          }
        });
      },
      error: (err) => {
        console.error('Falha ao criar pedido', err);
        alert(err.status === 401 ? 'Sessão expirada. Faça login novamente.' : 'Falha ao criar pedido');
        if (err.status === 401) this.router.navigateByUrl('/login');
      }
    });
  }
}

