import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = `http://localhost:3000/api`;
  private isLoggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public $isLoggedIn = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient) { }

  userLogin(email: string, password: string,): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/account/login`, body).pipe(
      switchMap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken}; path=/; Secure; HttpOnly`;
        return of(response);
      })
    );
  }

  userRegistration(data: any): Observable<any> {
    const body = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      countryCode: data.countryCode,
      mobile: data.mobile,
      password: data.password,
    };
    return this.http.post<any>(`${this.apiUrl}/account/register`, body);
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/account/refreshToken`, {}, { withCredentials: true }).pipe(
      switchMap((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        return response;
      }),
      catchError((error) => {
        this.logout();
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; Max-Age=0; path=/';
    this.isLoggedIn.next(false);
  }

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return token ? true : false;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  createRole(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${this.apiUrl}/role/create`, data);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/user-info`);
  }
}
