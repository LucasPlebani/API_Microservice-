import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  newPassword = '';
  token = '';
  message = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.http
      .post('http://localhost:3000/auth/reset-password', {
        token: this.token,
        newPassword: this.newPassword,
      })
      .subscribe({
        next: (res: any) => (this.message = res.message),
        error: (err) => (this.message = err.error.message),
      });
  }
}
