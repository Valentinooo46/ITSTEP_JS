import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  loading = false;
  error: string | null = null;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.error = null;
    if (this.form.invalid) {
      this.error = 'Будь ласка, заповніть форму коректно.';
      return;
    }
    const val = this.form.value;
    if (val.password !== val.confirmPassword) {
      this.error = 'Паролі не збігаються.';
      return;
    }
    this.loading = true;
    this.auth.register({ email: val.email, password: val.password, confirmPassword: val.confirmPassword })
      .subscribe({
        next: (res) => {
          this.loading = false;
          // Якщо токен вже збережений в AuthService через tap(), просто перейти на profile
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.loading = false;
          // Спрощена обробка помилок
          this.error = err?.error?.message || err?.message || 'Помилка реєстрації';
        }
      });
  }
}