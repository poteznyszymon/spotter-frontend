import { Component } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LogoutButton } from '../../components/logout-button/logout-button';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [LogoutButton],
})
export class Home {
  private authService = inject(AuthService);

  userQuery = injectQuery(() => ({
    queryKey: ['me'],
    queryFn: () => this.authService.fetchMe(),
    staleTime: 5 * 60 * 1000,
  }));
}
