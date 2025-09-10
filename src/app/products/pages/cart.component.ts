import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe],
  template: `
  <div class="cart-container">
    <div class="card">
      <h2>🛒 Seu Carrinho</h2>

      <div *ngIf="items.length === 0" class="empty-message">
        Seu carrinho está vazio.
      </div>

      <div class="items-grid" *ngIf="items.length > 0">
        <div class="item-card" *ngFor="let i of items">
          <div class="item-info">
            <div class="item-name">{{ i.product.name }}</div>
            <div class="item-price">{{ i.product.price | currency:'BRL':'symbol-narrow' }} x {{ i.quantity }}</div>
          </div>
          <button class="btn-delete" (click)="remove(i.product.id)">Remover</button>
        </div>
      </div>

      <div class="total" *ngIf="items.length > 0">
        <h3>Total: {{ total | currency:'BRL':'symbol-narrow' }}</h3>
        <a routerLink="/checkout"><button class="btn-primary">Finalizar compra</button></a>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .cart-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
      background: #f4f6f9;
      min-height: 100vh;
    }

    .card {
      width: 500px;
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    h2 {
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }

    .empty-message {
      text-align: center;
      color: #666;
      font-style: italic;
      margin: 2rem 0;
    }

    .items-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f9f9f9;
    }

    .item-info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .item-name {
      font-weight: bold;
      color: #333;
    }

    .item-price {
      color: #555;
    }

    .btn-delete {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 0.8rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .btn-delete:hover {
      background: #a71d2a;
    }

    .total {
      margin-top: 1.5rem;
      text-align: right;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.7rem 1.2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .btn-primary:hover {
      background: #0056b3;
    }
  `]
})
export class CartComponent implements OnInit {
  cart = inject(CartService);
  items: any[] = [];
  total: number = 0;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.items = this.cart.getItems();
    this.total = this.cart.total();
  }

  remove(id: number) {
    this.cart.remove(id);
    this.loadCart(); // atualiza visualização
  }
}
