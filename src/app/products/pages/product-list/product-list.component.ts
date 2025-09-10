import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../shared/models/models';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [RouterLink, NgFor, NgIf, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
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

