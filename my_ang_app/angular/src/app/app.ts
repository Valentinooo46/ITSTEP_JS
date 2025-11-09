import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// src/app/app.ts


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>My Angular  App</h1>
    <router-outlet></router-outlet>
  `
})
export class App {}