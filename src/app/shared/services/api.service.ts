
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  private url(path: string) {
    return `${environment.apiGatewayUrl}${path}`;
  }

  get<T>(path: string, p0: { headers: { Authorization: string; } | { Authorization?: undefined; }; }) { return this.http.get<T>(this.url(path)); }
  post<T>(path: string, body: any, p0: { headers: { Authorization: string; } | { Authorization?: undefined; }; }) { return this.http.post<T>(this.url(path), body); }
  put<T>(path: string, body: any, p0: { headers: { Authorization: string; } | { Authorization?: undefined; }; }) { return this.http.put<T>(this.url(path), body); }
  delete<T>(path: string, p0: { headers: { Authorization: string; } | { Authorization?: undefined; }; }) { return this.http.delete<T>(this.url(path)); }
}
