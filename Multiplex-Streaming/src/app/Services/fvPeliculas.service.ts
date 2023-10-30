import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterParamsRequest } from '../models/registerParams';
import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {PeliculaModel} from 'src/app/models/peliculaModel';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class fvPlService{

    urlBase = 'http://localhost:5000/api/favoritospelicula';
  currentUser: LoginRequest;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
  }

  get (): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    
    return this.http.get<PeliculaModel[]>(`${this.urlBase}`, { headers });
  }

  post(peliculaId:Number){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.post(`${this.urlBase}?peliculaId=${peliculaId}`, { headers });
  }

  delete(peliculaId:Number){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.delete(`${this.urlBase}?peliculaId=${peliculaId}`, { headers });
  }  
}