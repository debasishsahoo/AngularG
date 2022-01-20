import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Users } from '../model/user.model';
import { environment } from '../../../environments/environment';
const backendURL = environment.apiURL + '/user';

@Injectable({
  providedIn: 'root',
})
export class AccountserviceService {
  private isAuthenticated = false;
  private token: string | null = null;
  private tokenTimer: any;
  private userId: string | null = '';
  private authStatusListener = new Subject<boolean>();
  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) {}

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

  getUserDetails(userid: any) {
    return (
      this.http
        .get<{ message: string; User: any }>(backendURL + `/${userid}`)
        .subscribe((response) => {
          name: response.User.name;
        }),
      (err: any) => {
        this.err.next(err);
      }
    );
  }

  signIn(email: string, password: string) {
    const authdata = { email: email, password: password };
    this.http
      .post<{
        message: string;
        token: string;
        userdata: any;
        expiresIn: number;
      }>(backendURL + '/signin', authdata)
      .subscribe(
        //365day
        (response) => {
          this.err.next(null);
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration: number = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userdata._id;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.setAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/create']);
          }
        },

        (err: any) => {
          this.err.next(err);
        }
      );
  }

  signUp(userData: Users) {
    this.http
      .post<{ message: string; token: string; result: any }>(
        backendURL + '/signup',
        userData
      )
      .subscribe(
        (responsedata) => {
          this.err.next(null), this.router.navigate(['/signin']);
        },
        (err: any) => {
          this.err.next(err);
        }
      );
  }

  signOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
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

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.signOut();
    }, duration * 1000);
  }
  private setAuthData(token: string, duration: Date, userId: string | null) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', duration.toISOString());
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
