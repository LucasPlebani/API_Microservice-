import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl = 'http://localhost:3000/api/auth';
  private userId: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // Force la synchro de loggedIn avec le localStorage au démarrage
    this.loggedIn.next(this.isLoggedIn());
  }

  signupToApi(userData: any) {
    return this.http.post(`${this.apiBaseUrl}/signup`, userData);
  }

  loginToApi(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiBaseUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('role', response.role);
          this.loggedIn.next(true);

          setTimeout(() => {
            window.location.reload();
          }, 100);
        })
      );
  }

  getUserId(): string | null {
    if (this.userId) {
      return this.userId;
    }
    // Récupérer l'ID depuis localStorage
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  getUserRole(): string | null {
    // Récupérer le rôle depuis localStorage
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.clear();
    this.userId = null;
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('userId') &&
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('role')
    );
  }

  getUserInfo(userId: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user/${userId}`);
  }

  updateUserInfo(updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiBaseUrl}/profile`, updatedData, {
      headers,
    });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token envoyé:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiBaseUrl}/profile`, { headers });
  }
}
