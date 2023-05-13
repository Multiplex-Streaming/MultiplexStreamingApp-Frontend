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
  url = 'http://localhost:61061/connect/token';
  currentUserSubject: BehaviorSubject<LoginRequest>;
  currentUser: Observable<LoginRequest>;
  loggedIn= new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) { 
    console.log('Auth services');
    this.currentUserSubject = new BehaviorSubject<LoginRequest>(JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login (user: LoginRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `userName=${user.Email}&password=${user.Password}&grant_type=password&client_id=multiplex`;

    console.log(body);

    return this.http.post<any>(this.url, body, { headers }).pipe(map(data => {
      console.log("data: ", data);
      if (data.access_token) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
      }

      this.currentUserSubject.next(data);
      this.loggedIn.next(true);
      return data;
    }));
  }


  public get currentUserValue(): LoginRequest {
    return this.currentUserSubject.value;
  }

  public get estaAutenticado(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    window.sessionStorage.clear();
    localStorage.removeItem(TOKEN_KEY);
    this.loggedIn.next(false);
  }
}
