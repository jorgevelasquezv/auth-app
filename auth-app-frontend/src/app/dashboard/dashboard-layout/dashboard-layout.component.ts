import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  public onLogout() {
    this.authService.logout();
  }
}
