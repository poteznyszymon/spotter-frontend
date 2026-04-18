import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = async () => {
  const queryClient = inject(QueryClient);
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    await queryClient.fetchQuery({
      queryKey: ['me'],
      queryFn: () => authService.fetchMe(),
      staleTime: 5 * 60 * 1000,
    });
    return router.createUrlTree(['/']);
  } catch {
    return true;
  }
};
