import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  loading = false;
  error: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.error = null;
    this.auth.getProfile().subscribe({
      next: (res) => {
        this.loading = false;
        this.profile = res;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || err?.message || 'Не вдалося завантажити профіль';
      }
    });
  }

  logout() {
    this.auth.removeToken();
    this.profile = null;
  }
}