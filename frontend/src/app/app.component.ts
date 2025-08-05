import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MarioKart';
  isLoggedIn = false;
  userRole: string | null = null;
  isProfessionnelRole = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.loggedIn$.subscribe((isLogged: boolean) => {
      setTimeout(() => {
        this.isLoggedIn = isLogged;
      });
    });

    if (this.isLoggedIn === true) {
      this.userRole = this.authService.getUserRole();
      console.log("Rôle de l'utilisateur récupéré :", this.userRole);
      if (this.userRole === 'store') {
        console.log("L'utilisateur est un professionnel");
        this.isProfessionnelRole = true;
      }
    }
  }
}
