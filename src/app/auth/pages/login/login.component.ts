import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  passwordhash = '';
  errorMessage = '';

  submit() {
    this.errorMessage = '';
    this.auth.login({ username: this.username, passwordhash: this.passwordhash })
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => {
          console.error(err);
          if (err.status === 401) this.errorMessage = 'Usuário ou senha inválidos.';
          else if (err.status === 400) this.errorMessage = err.error || 'Requisição inválida.';
          else this.errorMessage = 'Erro inesperado no login.';
        }
      });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}

