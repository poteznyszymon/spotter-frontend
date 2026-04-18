import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [ButtonModule],
  templateUrl: './logout-button.html',
})
export class LogoutButton {
  private authService = inject(AuthService);
  private queryClient = inject(QueryClient);
  private router = inject(Router);

  loginMutation = injectMutation(() => ({
    mutationFn: () => this.authService.logout(),
    onSuccess: async () => {
      this.queryClient.removeQueries({ queryKey: ['me'] });
      await this.router.navigate(['/login']);
    },
    onError: (error) => console.error('logout error:', error),
  }));

  loading = this.loginMutation.isPending;

  onLogout() {
    this.loginMutation.mutate();
  }
}
