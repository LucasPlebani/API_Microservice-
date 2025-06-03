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
      next: () => {},
      error: (err) => console.error('Observable emitted an error: ' + err),
      complete: () => alert('User connected'),
    });
    // console.log('Email:', this.email);
    // console.log('Password:', this.password);
  }
}

// cors fait en sorte que les requêtes soient effectuées (sinon bloquées)
// faire un service auth pour gérer l'authentification
// apiUrl = 'http://localhost:3000';
// faire une fonction ts qui va utiliser la requête de node
