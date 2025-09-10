import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../../shared/models/models';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [RouterLink, NgFor, NgIf, CurrencyPipe],
  template: `
  <div class="product-container">
    <h2>🛍️ Produtos</h2>

    <div *ngIf="products.length === 0" class="empty-message">
      Nenhum produto disponível.
    </div>

    <div class="products-grid" *ngIf="products.length > 0">
      <div class="product-card" *ngFor="let p of products">
       <img [src]="p.imageUrl ? 'http://localhost:5202/images/' + p.imageUrl : 'https://via.placeholder.com/150'" />
        <div class="product-info">
          <h3><a [routerLink]="['/product', p.id]">{{p.name}}</a></h3>
          <p class="price">{{p.price | currency:'BRL':'symbol-narrow'}}</p>
        </div>

        <button class="btn-add" (click)="add(p)">🛒 Adicionar ao carrinho</button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .product-container {
      padding: 2rem;
      background: #f4f6f9;
      min-height: 100vh;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .empty-message {
      text-align: center;
      color: #666;
      font-style: italic;
      margin-top: 2rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.12);
    }

    .product-image {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .product-info h3 {
      font-size: 1.1rem;
      margin: 0.5rem 0;
      color: #007bff;
    }

    .product-info h3 a {
      text-decoration: none;
      color: inherit;
    }

    .product-info h3 a:hover {
      text-decoration: underline;
    }

    .price {
      color: #555;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .btn-add {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .btn-add:hover {
      background: #218838;
    }
  `]
})
export class ProductListComponent implements OnInit {
  private service = inject(ProductService);
  private cart = inject(CartService);
  products: Product[] = [];

  ngOnInit() {
    this.service.list().subscribe({
      next: (res) => this.products = res,
      error: () => this.products = []
    });
  }

  add(p: Product) {
    this.cart.add(p, 1);
    alert('Produto adicionado ao carrinho!');
  }
}
