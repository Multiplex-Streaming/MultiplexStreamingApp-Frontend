import { Injectable } from '@angular/core';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { GeneroModel } from 'src/app/models/generoModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterParamsRequest } from '../models/registerParams';
import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  urlBase = 'http://localhost:61061/api/peliculas';
  currentUser: LoginRequest;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
  }

  get (): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.get<PeliculaModel[]>(`${this.urlBase}/all`, { headers });
  }
}
