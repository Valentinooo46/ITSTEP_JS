import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://lohika.itstep.click/api/Account';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  register(payload: { email: string; password: string; confirmPassword?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, payload).pipe(
      tap((res: any) => {
        if (res && res.token) {
          this.setToken(res.token);
        }
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}