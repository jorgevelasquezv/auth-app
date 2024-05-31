import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      // Login logic here
      this.authService
        .login(
          this.loginForm.value.email as string,
          this.loginForm.value.password as string
        )
        .subscribe((success) => {
          if (success) {
            console.log('Logged in successfully');
          } else {
            console.log('Failed to login');
          }
        });
    }
  }
}
