import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [FormsModule],
})
export class Login {
  username = signal('');
  password = signal('');

  loading = signal(false);

  onSubmit = () => {
    this.loading.set(true);
    setTimeout(() => {
      console.log(this.username(), this.password());
      this.loading.set(false);
    }, 1500);
  };
}
