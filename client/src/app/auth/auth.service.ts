import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // GETTERS
  getToken() { }

  getIsAuth() { }

  getUserId() { }

  getAuthStatusListener() { }

  login(email: any, password: any) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.router.navigate(['/']).then();
  }

  logout() {
    this.router.navigate(['/']).then();
  }

  private setAuthTimer(duration: number) { }

  autoAuthUser() { }

  // STATIC FUNCTIONS
  private static saveAuthData(token: string, expirationDate: Date, userId: string) { }
  private static clearAuthData() { }
  private static getAuthData() { }

}
