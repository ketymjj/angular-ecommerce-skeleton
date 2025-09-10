import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Product } from '../../shared/models/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CurrencyPipe, NgIf],
  template: `
  <div *ngIf="product" class="product-detail-card">
    <h2>{{product.name}}</h2>
    <div class="image-container">
      <img [src]="product.imageUrl ? 'http://localhost:5202/images/' + product.imageUrl : 'https://via.placeholder.com/150'" 
       class="product-image" />
    </div>
    <p class="description">{{product.description || 'Sem descrição disponível.'}}</p>
    <h3 class="price">{{product.price | currency:'BRL':'symbol-narrow'}}</h3>
    <button class="btn-add" (click)="add()">🛒 Adicionar ao carrinho</button>
  </div>
  <div *ngIf="!product" class="loading">
    Carregando produto...
  </div>
  `,
  styles: [`
    .product-detail-card {
      max-width: 600px;
      margin: 40px auto;
      padding: 25px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-detail-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }

    h2 {
      color: #007bff;
      margin-bottom: 20px;
    }

    .image-container {
      margin-bottom: 20px;
    }

    .image-container img {
      width: 100%;
      max-width: 300px;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .description {
      margin-bottom: 15px;
      color: #555;
      line-height: 1.5;
    }

    .price {
      color: #28a745;
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 1.4rem;
    }

    .btn-add {
      background: #28a745;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s, transform 0.2s;
    }

    .btn-add:hover {
      background: #218838;
      transform: translateY(-2px);
    }

    .loading {
      text-align: center;
      color: #666;
      font-style: italic;
      margin-top: 50px;
      font-size: 1.1rem;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);
  private cart = inject(CartService);
  product?: Product;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(id).subscribe(p => this.product = p);
  }

  add() {
    if (this.product) {
      this.cart.add(this.product, 1);
      alert('Produto adicionado ao carrinho!');
    }
  }
}
