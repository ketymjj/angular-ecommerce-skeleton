import { Component, OnInit, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../products/services/product.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../../shared/models/models';


@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);

  products: Product[] = [];
  currentProduct: Product = { id: 0, name: '', description: '', price: 0, stockQuantity: 0, imageUrl: 'assets/images/' };
  isAdmin = false;
  selectedImageFile: File | null = null;

  ngOnInit() {
    this.isAdmin = this.authService.hasRole('Admin');
    if (this.isAdmin) this.loadProducts();
  }

  loadProducts() {
    this.productService.list().subscribe(res => this.products = res);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file; // guarda o arquivo para enviar
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.currentProduct.imageUrl = base64; // preview em base64
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (this.currentProduct.id) {
      // Atualizar produto
      this.productService.update(
        this.currentProduct.id,
        this.currentProduct,
        this.selectedImageFile ?? undefined
      ).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      // Criar produto
      this.productService.create(
        this.currentProduct,
        this.selectedImageFile ?? undefined
      ).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.currentProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      imageUrl: 'assets/images/'
    };
    this.selectedImageFile = null;
  }

  editProduct(product: Product) {
    this.currentProduct = { ...product };
  }

  cancelEdit() {
    this.currentProduct = { id: 0, name: '', description: '', price: 0, stockQuantity: 0, imageUrl: 'assets/images/' };
  }

  deleteProduct(productId: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.delete(productId).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }
}
