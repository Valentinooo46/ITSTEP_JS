import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Реєстрація</h2>
    <form (ngSubmit)="register()">
      <input [(ngModel)]="user.email" name="email" placeholder="Email" required />
      <input [(ngModel)]="user.firstName" name="firstName" placeholder="Ім'я" required />
      <input [(ngModel)]="user.secondName" name="secondName" placeholder="Прізвище" required />
      <input [(ngModel)]="user.photo" name="photo" placeholder="Фото (URL)" />
      <input [(ngModel)]="user.phone" name="phone" placeholder="Телефон" />
      <input [(ngModel)]="user.password" name="password" type="password" placeholder="Пароль" required />
      <input [(ngModel)]="user.confirmPassword" name="confirmPassword" type="password" placeholder="Підтвердження пароля" required />
      <button type="submit">Зареєструватися</button>
    </form>
  `
})
export class RegisterComponent {
  user = {
    email: '',
    firstName: '',
    secondName: '',
    photo: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
      error: (err) => console.error('Registration failed', err)
    });
  }
}