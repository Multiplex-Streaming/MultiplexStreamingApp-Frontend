import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/loginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:5000/connect/token';
  currentUserSubject: BehaviorSubject<LoginRequest>;
  currentUser: Observable<LoginRequest>;
  loggedIn= new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginRequest>(JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login (user: LoginRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `userName=${user.Email}&password=${user.Password}&grant_type=password&client_id=multiplex`;

    return this.http.post<any>(this.url, body, { headers }).pipe(map(data => {
      if (data.access_token) {
        const loginModel = new LoginRequest();
        loginModel.Email = user.Email;
        loginModel.Token = data.access_token;
        localStorage.setItem(TOKEN_KEY, JSON.stringify(loginModel));
        this.currentUserSubject.next(loginModel);
        this.currentUser = this.currentUserSubject.asObservable();
        this.loggedIn.next(true);  
      }
      return data;
    }));
  }


  public get currentUserValue(): LoginRequest {
    return this.currentUserSubject.value;
  }

  public get esAdmin(): boolean {
    return this.currentUserSubject.value.Email === 'martin@gmail.com';
  }

  public get estaAutenticado(): Observable<boolean> {
    let hasToken = false;
    this.currentUser.subscribe((value) => hasToken = !(value.Token === "" || value.Token === undefined))
    this.loggedIn.next(hasToken);
    return this.loggedIn.asObservable();
  }

  logout(): void {
    window.sessionStorage.clear();
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject = new BehaviorSubject<LoginRequest>(JSON.parse('{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.loggedIn.next(false);
  }
}
