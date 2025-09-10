import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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

