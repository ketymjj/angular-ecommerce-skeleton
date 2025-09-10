import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import necessário

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule], // ✅ Adicionado CommonModule
  template: `
    <header class="toolbar">
      <a routerLink="/">🏪 Loja</a>
      <a routerLink="/cart">🛒 Carrinho</a>
      <a routerLink="/orders">📦 Meus Pedidos</a>
      <a routerLink="/admin">🛠️ Admin</a>
      <span class="spacer"></span>
      <ng-container *ngIf="isLoggedIn(); else loginLink">
        <span>Olá, {{ username() }}</span>
        <button (click)="logout()">Sair</button>
      </ng-container>
      <ng-template #loginLink>
        <a routerLink="/login">Entrar</a>
      </ng-template>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  private auth = inject(AuthService);

  isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  username(): string {
    return this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
  }
}
