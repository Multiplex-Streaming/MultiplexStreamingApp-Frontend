import { Injectable } from '@angular/core';
import { AbonadoModel } from 'src/app/models/abonadoModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from 'src/app/models/loginRequest';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AbonadosService {
  urlBase = 'http://localhost:5000/api/usuarios';
  currentUser: LoginRequest;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
  }

  get (estado: String): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.get<AbonadoModel[]>(`${this.urlBase}/pendientes/${estado}`, { headers });
  }

  updateStatus (id: Number, status: String): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    const abonado = {
        abonadoId: id,
        nuevoEstado: status
    }
    return this.http.put(this.urlBase + '/update-abonado-status', abonado, { headers });
  }
}