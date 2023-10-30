import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterParamsRequest } from '../models/registerParams';
import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SerieModel } from '../models/serieModel';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

export class fvSrService{

    urlBase = 'http://localhost:5000/api/favoritosseries';
    currentUser: LoginRequest;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
    }

    get (): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        
        return this.http.get<SerieModel[]>(`${this.urlBase}`, { headers });
    }

    post(serieId:Number){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.post(`${this.urlBase}?serieId=${serieId}`, { headers });
    }

    delete(serieId:Number){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.delete(`${this.urlBase}?serieId=${serieId}`, { headers });
    }  
}