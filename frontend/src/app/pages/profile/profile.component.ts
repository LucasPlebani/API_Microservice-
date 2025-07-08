import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  loading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.user = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.router.navigate(['/login']);
      },
    });
  }

  onSubmit(): void {
    this.authService.updateUserInfo(this.user).subscribe({
      next: () => alert('Profil mis à jour !'),
      error: (err) => alert('Erreur lors de la mise à jour : ' + err.message),
    });
  }
}
