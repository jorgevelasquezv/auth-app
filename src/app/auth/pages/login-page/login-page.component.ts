import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public loginForm = this.formBuilder.group({
    email: ['isaacv@mail.com', [Validators.required, Validators.email]],
    password: ['AbC123456', [Validators.required, Validators.minLength(8)]],
  });

  public login() {
    if (this.loginForm.valid) {
      // Login logic here
      this.authService
        .login(
          this.loginForm.value.email as string,
          this.loginForm.value.password as string
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error,
            });
          },
        });
    }
  }
}
