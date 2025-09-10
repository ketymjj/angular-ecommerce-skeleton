import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../shared/models/models';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CurrencyPipe, NgIf],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
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
