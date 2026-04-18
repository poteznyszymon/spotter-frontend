import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LoginRequest } from '../../../../models/auth.model';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [ReactiveFormsModule],
})
export class Login {
  private authService = inject(AuthService);
  private queryClient = inject(QueryClient);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginMutation = injectMutation(() => ({
    mutationFn: (request: LoginRequest) => this.authService.login(request),
    onSuccess: async () => {
      await this.queryClient.invalidateQueries({ queryKey: ['me'] });
      await this.router.navigate(['/']);
    },
    onError: (error) => console.error('login error:', error),
  }));

  loading = this.loginMutation.isPending;
  submitted = false

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loginMutation.mutate({
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    });
  }
}
