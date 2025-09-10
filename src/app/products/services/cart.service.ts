import { Injectable } from '@angular/core';
import { Product, CartItem } from '../../shared/models/models';
import { environment } from '../../../environments/environment';
import { StorageUtil } from '../../shared/utils/storage.util';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = environment.storageKeys.cart;

  getItems(): CartItem[] {
    return StorageUtil.get<CartItem[]>(this.key) || [];
  }
  add(product: Product, qty = 1) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) items[idx].quantity += qty; else items.push({ product, quantity: qty });
    StorageUtil.set(this.key, items);
  }
  remove(productId: number) {
    const items = this.getItems().filter(i => i.product.id !== productId);
    StorageUtil.set(this.key, items);
  }
  clear() { StorageUtil.remove(this.key); }
  total(): number {
    return this.getItems().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
}
