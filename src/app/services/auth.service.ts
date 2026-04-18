import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LoginRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(request: LoginRequest) {
    return firstValueFrom(
      this.http.post<AuthResponse>('/api/auth/login', request, { withCredentials: true }),
    );
  }

  logout() {
    return firstValueFrom(
      this.http.post<void>('/api/auth/logout', null, { withCredentials: true }),
    );
  }

  fetchMe() {
    return firstValueFrom(
      this.http.get<User>('/api/auth/me', { withCredentials: true }),
    );
  }
}
