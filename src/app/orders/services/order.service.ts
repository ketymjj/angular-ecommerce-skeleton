import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Order, OrderItem } from '../../shared/models/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = inject(ApiService);

  private get authHeaders() {
    localStorage.getItem('token');
    return localStorage
      ? { Authorization: `Bearer ${localStorage}` }
      : {};
  }

  // Cria um pedido
create(order: Order): Observable<Order> {
  return this.api.post<Order>(
    `${environment.services.orders}`,
    order, // ⚠️ enviar apenas o objeto
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  );
}

  // Cria os itens do pedido
  createItems(items: OrderItem[]): Observable<OrderItem[]> {
    return this.api.post<OrderItem[]>(
      `${environment.services.orderItems}`,
      items,
      { headers: this.authHeaders }
    );
  }

  // Lista os pedidos do usuário logado
  mine(): Observable<Order[]> {
    return this.api.get<Order[]>(
      `${environment.services.orders}`,
      { headers: this.authHeaders }
    );
  }

  // Lista os itens de um pedido específico
  mineItems(orderId: number): Observable<OrderItem[]> {
    return this.api.get<OrderItem[]>(
      `${environment.services.orders}/${orderId}`,
      { headers: this.authHeaders }
    );
  }
}
