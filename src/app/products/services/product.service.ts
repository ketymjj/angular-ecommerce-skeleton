import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/models';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService) {}

  // Headers de autenticação

  private get authHeaders() {
    localStorage.getItem('token');
    return localStorage
      ? { Authorization: `Bearer ${localStorage}` }
      : {};
  }

  // Listar todos os produtos
  list(): Observable<Product[]> {
    return this.api.get<Product[]>(`${environment.services.products}`, {
      headers: this.authHeaders,
    });
  }

  // Obter produto por id
  get(id: number): Observable<Product> {
    return this.api.get<Product>(`${environment.services.products}/${id}`, {
      headers: this.authHeaders,
    });
  }

  // Criar novo produto (com suporte a imagem)
create(product: Product, imageFile?: File): Observable<Product> {
  const formData = new FormData();
  formData.append('name', product.name ?? '');
  formData.append('description', product.description ?? '');
  formData.append('price', product.price?.toString() ?? '0');
  formData.append('stockQuantity', product.stockQuantity?.toString() ?? '0');

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return this.api.post<Product>(
    `${environment.services.products}`,
    formData,
    {
      headers: this.authHeaders // objeto literal { Authorization: 'Bearer ...' }
    }
  );
}

update(id: number, product: Product, imageFile?: File): Observable<Product> {
  const formData = new FormData();
  formData.append('id', product.id?.toString() ?? '0');
  formData.append('name', product.name ?? '');
  formData.append('description', product.description ?? '');
  formData.append('price', product.price?.toString() ?? '0');
  formData.append('stockQuantity', product.stockQuantity?.toString() ?? '0');

  if (imageFile) {
    formData.append('image', imageFile);
  }

  return this.api.put<Product>(
    `${environment.services.products}/${id}`,
    formData,
    {
      headers: this.authHeaders // objeto literal { Authorization: 'Bearer ...' }
    }
  );
}

  // Excluir produto
  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${environment.services.products}/${id}`, {
      headers: this.authHeaders,
    });
  }
  
}
