import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from 'src/app/models/loginRequest';

@Injectable({
  providedIn: 'root'
})

export class MetricasService {
  urlBase = 'http://localhost:5000/api/metricas';
  currentUser: LoginRequest;
  topPeliculas: Observable<any>;

  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('auth-token') || '{}')
    this.topPeliculas = new Observable<any>();
  }
  
  getTopPeliculas(): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get<any>(`${this.urlBase}/top-peliculas`, { headers });
  }

  getTopSeries(): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get<any>(`${this.urlBase}/top-series`, { headers });
  }

  getGenerosMasVistosPeliculas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get(`${this.urlBase}/generos-mas-vistos-peliculas`, { headers });
  }

  getGenerosMasVistosSeries(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get(`${this.urlBase}/generos-mas-vistos-series`, { headers });
  }

  getUsuariosMasVieronPeliculas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get(`${this.urlBase}/usuarios-mas-vieron-peliculas`, { headers });
  }

  getUsuariosMasVieronSeries(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get(`${this.urlBase}/usuarios-mas-vieron-series`, { headers });
  }

}
