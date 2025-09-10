import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

type Decoded = { 
  sub?: string; 
  name?: string; 
  role?: string | string[]; 
  [k: string]: any 
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}

  // 🔑 Login (com token)
  login(data: { username: string; passwordhash: string }) {
    return this.api.post<{ token: string; username: string }>(
      `${environment.services.auth}/login`,
      data,
      {
        headers: {
          Authorization: ''
        }
      }
    ).pipe(
      tap(res => {
        if (res?.token) {
          this.saveToken(res.token);
        }
      })
    );
  }

  // ✅ Registro (sem token)
  register(data: { username: string; passwordhash: string; role: string }) {
  return this.api.post<{ message: string }>(
    `${environment.services.auth}/register`,
    data,
    { headers: { Authorization: undefined } }
  );
}

  // 🔑 Armazenar token
  private saveToken(token: string) {
    localStorage.setItem(environment.storageKeys.token, token);
  }

  // 🔑 Logout
  logout() {
    localStorage.removeItem(environment.storageKeys.token);
    this.router.navigate(['/login']);
  }

  // 🔑 Checar se usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // 🔑 Pegar token
  getToken(): string | null {
    const token = localStorage.getItem(environment.storageKeys.token);
    return token ? token.replace(/"/g, '') : null;
  }

  // 🔑 Pegar username do token
  getUsername(): string {
    const token = this.getToken();
    if (!token) return '';
    try {
      const d = jwtDecode<Decoded>(token);
      return (d.name || d.sub || '').toString();
    } catch {
      return '';
    }
  }

  // 🔑 Verificar role
  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const d = jwtDecode<Decoded>(token);
      const roles = Array.isArray(d.role) ? d.role : (d.role ? [d.role] : []);
      return roles.map(r => r.toLowerCase()).includes(role.toLowerCase());
    } catch {
      return false;
    }
  }
}