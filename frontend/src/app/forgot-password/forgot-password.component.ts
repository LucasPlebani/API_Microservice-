import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(private http: HttpClient) {}
  email = '';
  message = '';

  onSubmit() {
    this.http
      .post('http://localhost:3000/api/auth/forgot-password', {
        email: this.email,
      })
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
        },
        error: (err) => {
          alert(err.error?.message || 'Une erreur est survenue.');
        },
        complete: () => {
          alert(
            'Un lien pour changer votre mot de passe vous a été envoyé par email.'
          );
        },
      });
  }
}
