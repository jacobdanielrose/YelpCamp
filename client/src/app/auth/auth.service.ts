import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + "/user/";


//TODO: REFACTOR THE DEPRECATED SUBSCRIBE METHODS

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token!: String | null;
  private tokenTimer!: NodeJS.Timer;
  private userId!: string | null;
  private authStatusListener = new Subject<boolean>();


  constructor(private http: HttpClient, private router: Router) { }

  // GETTERS
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, username: string, password: string) {
    const authData: AuthData = { email: email, username: username, password: password };
    return this.http
      .post(BACKEND_URL + "signup", authData)
      .subscribe(() => {
        this.router.navigate(["/"]).then();
      }, () => {
        this.authStatusListener.next(false);
      });
  }

  login(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + "login", authData)
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          AuthService.saveAuthData(this.token as string, expirationDate, this.userId);
          this.router.navigate(['/']).then();
        }
      }, () => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    AuthService.clearAuthData();
    this.router.navigate(['/']).then();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = AuthService.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  // STATIC FUNCTIONS
  private static saveAuthData(token: string, expirationDate: Date, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private static clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private static getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

}
