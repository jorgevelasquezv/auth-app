import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly authServices: AuthService = inject(AuthService);

  private readonly router: Router = inject(Router);

  public finishedAuthCheck = computed<boolean>(
    () => this.authServices.authStatus() !== AuthStatus.checking
  );

  public authStatusChangedEffect = effect(() => {
    switch (this.authServices.authStatus()) {
      case AuthStatus.checking:
        break;
      case AuthStatus.authenticated: {
        const url = localStorage.getItem('url');
        this.router.navigateByUrl(url ?? '/dashboard');
        break;
      }
      case AuthStatus.unauthenticated:
        this.router.navigateByUrl('/auth/login');
        break;
    }
  });
}
