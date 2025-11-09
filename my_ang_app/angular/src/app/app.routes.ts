import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
