import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from 'src/app/models/loginRequest';

@Injectable({
  providedIn: 'root'
})

export class PagosService {
  urlBase = 'http://localhost:5000/api/pagos';
  currentUser: LoginRequest;
  abonadosPagos: Observable<any>;

  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('auth-token') || '{}')
    this.abonadosPagos = new Observable<any>();
  }
}
