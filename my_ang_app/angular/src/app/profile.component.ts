import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Профіль користувача</h2>
    <div *ngIf="profile">
      <p>Email: {{ profile.email }}</p>
      <p>Ім'я: {{ profile.firstName }}</p>
      <p>Прізвище: {{ profile.secondName }}</p>
      <p>Телефон: {{ profile.phone }}</p>
      <img *ngIf="profile.photo" 
     [src]="'https://lohika.itstep.click/images/200_' + profile.photo" 
     alt="Фото" width="400" />

    </div>
  `
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data) => this.profile = data,
      error: (err) => console.error('Failed to load profile', err)
    });
  }
}