import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    // subscribe sert à lancer la fonction loginToApi
    this.auth.loginToApi(this.email, this.password).subscribe({
      next: (response) => {
        const userId = response.userId || response.user?._id;

        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('ID utilisateur stocké :', userId);
        } else {
          console.warn('Réponse sans ID utilisateur :', response);
        }
      },
      error: (err) => console.error('Erreur lors de la connexion : ' + err),
      complete: () => alert('Utilisateur connecté'),
    });
  }
}
