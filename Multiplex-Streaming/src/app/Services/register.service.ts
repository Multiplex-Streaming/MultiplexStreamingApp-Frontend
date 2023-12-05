import { Injectable } from '@angular/core';
import { RegisterRequest } from 'src/app/models/registerRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterParamsRequest } from '../models/registerParams';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = 'http://localhost:5000/api/usuarios';

  constructor(private http: HttpClient) {
  }

  create (user: RegisterRequest): Observable<any> {
    const body = new RegisterParamsRequest();
    body.Id = 0;
    body.Correo = user.Email,
    body.EsAbonado = true,
    body.Nombre = user.Name,
    body.Apellido = user.Surname,
    body.Clave = user.Password;

    return this.http.post<RegisterParamsRequest>(this.url, body).pipe(map(data => {
      return data;
    }));
  }
}
