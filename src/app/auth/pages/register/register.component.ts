import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  passwordhash = '';
  role = '';
  errorMessage = '';
  successMessage = '';

  // ✅ Função para navegar para a tela de login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  submit() {
    this.errorMessage = '';
    this.successMessage = '';

    // ✅ Validação de campos obrigatórios
    if (!this.username.trim() || !this.passwordhash.trim() || !this.role.trim()) {
      this.errorMessage = 'Todos os campos são obrigatórios.';
      return;
    }

    const payload = {
      username: this.username,
      passwordhash: this.passwordhash,
      role: this.role
    };

    this.auth.register(payload).subscribe({
      next: (res: any) => {
        // ✅ Corrigido: Extrai a mensagem do objeto se for um objeto
        if (typeof res === 'object' && res !== null) {
          // Tenta obter a mensagem de diferentes propriedades possíveis
          this.successMessage = res.message || res.msg || res.success || 
                               'Registro efetuado com sucesso!';
        } else {
          // Se não for objeto, usa diretamente
          this.successMessage = res || 'Registro efetuado com sucesso!';
        }
        
        // Limpa o formulário
        this.username = '';
        this.passwordhash = '';
        this.role = '';
        
        // ✅ Redireciona para login após 2 segundos (para o usuário ver a mensagem)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('Erro no registro:', err);
  
        // Se o erro for 400, o backend ainda pode retornar JSON!
        if (err.status === 400) {
          // Tenta obter a mensagem de erro do JSON (se existir)
          try {
            const errorObj = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            this.errorMessage = errorObj.message || errorObj.msg || 'Usuário já existe.';
          } catch {
            // Se não for JSON, usa o texto puro
            this.errorMessage = err.error || 'Usuário já existe.';
          }
        } else {
          this.errorMessage = 'Erro inesperado no registro.';
        }
      }
    });
  }
}