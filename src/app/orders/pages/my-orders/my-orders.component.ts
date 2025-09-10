import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';

import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/models/models';

@Component({
  standalone: true,
  selector: 'app-my-orders',
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  private service = inject(OrderService);
  private router = inject(Router);
  orders: Order[] = [];

  ngOnInit() {
    localStorage.getItem('token');
    if (!localStorage) {
      alert('Usuário não autenticado. Faça login.');
      this.router.navigateByUrl('/login');
      return;
    }

    this.service.mine().subscribe({
      next: (data: Order[]) => this.orders = data,
      error: (err) => {
        console.error('Falha ao carregar pedidos', err);
        if (err.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          this.router.navigateByUrl('/login');
        } else {
          alert('Erro ao carregar pedidos');
        }
      }
    });
  }
}

