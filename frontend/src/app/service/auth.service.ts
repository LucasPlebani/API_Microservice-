import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = 'http://localhost:3000/api/auth';
  private userId: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  signupToApi(userData: any) {
    return this.http.post(`${this.apiBaseUrl}/signup`, userData);
  }

  loginToApi(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          // Stocker dans localStorage
          this.userId = response.userId;
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        })
      );
  }

  getUserId(): string | null {
    if (this.userId) {
      return this.userId;
    }
    // Récupérer depuis localStorage
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId') && !!localStorage.getItem('token');
  }
}
