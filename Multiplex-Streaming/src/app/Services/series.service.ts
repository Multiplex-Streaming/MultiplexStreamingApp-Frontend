import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SerieModel} from 'src/app/models/serieModel';
import { CapituloModel } from '../models/capituloModel';

const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})

export class SerieService
{
    urlBase = 'http://localhost:5000/api/series';
    currentUser: LoginRequest;

    constructor(private http: HttpClient) 
    {
        this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
    }

    //Get all series
    get (): Observable<any> 
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.get<SerieModel[]>(`${this.urlBase}/all`, {headers});
    }

    //Get de todos los capitulos
    getCapitulos (): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.get<CapituloModel[]>('http://localhost:5000/api/taxonomy/capitulos', {headers});
    }

    //Agregar Serie
    post (serie: SerieModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.post<SerieModel>(this.urlBase, serie, {headers});
    }

    //Editar Serie
    put (serie: SerieModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        
        return this.http.put<SerieModel>(this.urlBase, serie, { headers });
    }

    //Eliminar Serie
    delete (id: Number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    
        return this.http.delete(`${this.urlBase}/${id}`, { headers });
    }

    //Agregar capitulo (se debe pasar al back id de la serie)
    /*postCapitulo(capitulo: CapituloModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.post<CapituloModel>(this.urlBase, capitulo, {headers});
    }*/
}

