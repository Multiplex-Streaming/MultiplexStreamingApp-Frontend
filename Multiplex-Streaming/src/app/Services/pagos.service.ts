import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from 'src/app/models/loginRequest';

@Injectable({
  providedIn: 'root'
})

export class PagosService {
  urlBase = 'http://localhost:5000/api';
  currentUser: LoginRequest;
  abonadosPagos: Observable<any>;

  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('auth-token') || '{}')
    this.abonadosPagos = new Observable<any>();
  }

  addPago(id: number, pago: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.post(`${this.urlBase}/pagos/${id}`, pago, { headers });
  }

  updatePago(id: number, pago: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.put(`${this.urlBase}/pagos/${id}`, pago, { headers });
  }

  notificarAbonadosConPagosPendientes(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    return this.http.get(`${this.urlBase}/pagos/notificar-abonados-con-pagos-pendientes`, { headers });
  }
}
