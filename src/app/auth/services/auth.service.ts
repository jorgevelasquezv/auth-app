import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly backendBaseUrl: string = environment.backendBaseUrl;

  private readonly http: HttpClient = inject(HttpClient);

  private _currentUser = signal<User | null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.authenticated);

  public currentUser = computed(() => this._currentUser());

  public authStatus = computed(() => this._authStatus());

  constructor() {}

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this.backendBaseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
