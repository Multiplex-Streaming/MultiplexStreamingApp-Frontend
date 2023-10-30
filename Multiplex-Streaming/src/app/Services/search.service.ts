import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SerieModel} from 'src/app/models/serieModel';
import { PeliculaModel } from '../models/peliculaModel';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})

export class SearchService {

    urlBase = 'http://localhost:5000/api/taxonomy';
    currentUser: LoginRequest;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
    }

    getPl(title:string){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.get<PeliculaModel[]>(`${this.urlBase}/pelicula?title=${title}`, { headers });
    }

    getSr(title:string){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.get<SerieModel[]>(`${this.urlBase}/serie?title=${title}`, { headers });
    }

}