import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signupToApi(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Observable<string[]> {
    return this.http.post<any[]>(`${this.apiBaseUrl}/signup`, {
      name,
      surname,
      email,
      password,
    });
  }

  loginToApi(email: string, password: string): Observable<string[]> {
    return this.http.post<any[]>(`${this.apiBaseUrl}/login`, {
      email,
      password,
    });
  }
}

// cors fait en sorte que les requêtes soient effectuées (sinon bloquées)
// faire un service auth pour gérer l'authentification
// apiUrl = 'http://localhost:3000';
// faire une fonction ts qui va utiliser la requête de node

// importer le httpClient dans le app, le httpclientmodule est déprécié
// https://angular.dev/api/common/http/HttpClient
