import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signupToApi(userData: any) {
    return this.http.post(`${this.apiBaseUrl}/signup`, userData);
  }

  loginToApi(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/login`, {
      email,
      password,
    });
  }
}
