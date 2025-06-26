import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  type: string = ''; // ou 'professionnel'

  // particuliers
  lastName: string = '';
  firstName: string = '';

  // professionnels
  companyName: string = '';
  siren: string = '';

  // commun
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  onSubmit() {
    const userData: any = {
      type: this.type,
      email: this.email,
      password: this.password,
    };

    if (this.type === 'particulier') {
      userData.lastName = this.lastName;
      userData.firstName = this.firstName;
    } else if (this.type === 'professionnel') {
      userData.companyName = this.companyName;
      userData.siren = this.siren;
    }

    console.log('Données envoyées depuis Angular :', userData);

    this.auth.signupToApi(userData).subscribe({
      next: () => {},
      error: (err) => {
        console.error("Erreur lors de l'inscription :", err);
        alert(
          "Erreur lors de l'inscription : " +
            (err.error?.message || JSON.stringify(err))
        );
      },
      complete: () => alert('Utilisateur inscrit'),
    });
  }
}
