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
  urlBase = 'http://localhost:5000/api/peliculas';
  currentUser: LoginRequest;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
  }

  getFormData (pelicula: PeliculaModel): FormData {
    //form data
    const formData = new FormData();
    const file = pelicula.file;
    const portadaFile = pelicula.portadaFile;
    formData.append('Id', pelicula.id.toString());
    formData.append('Titulo', pelicula.titulo.toString());
    formData.append('Descripcion', pelicula.descripcion.toString());
    formData.append('Duracion', pelicula.duracion.toString());
    formData.append('Elenco',  pelicula.elenco.toString());
    formData.append('Url',  pelicula.url.toString());
    pelicula.generos?.forEach((item)=> {
      formData.append('GenerosList', item.id.toString());
    })
    if (portadaFile != null)
      formData.append('PortadaFile', portadaFile, portadaFile.name);
    if (file != null)
      formData.append('File', file, file.name);

      return formData;
  }
  get (): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.get<PeliculaModel[]>(`${this.urlBase}/all`, { headers });
  }

  getGeneros (): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.get<GeneroModel[]>('http://localhost:5000/api/taxonomy/generos', { headers });
  }

  post (pelicula: PeliculaModel): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    const formData = this.getFormData(pelicula);
    return this.http.post(this.urlBase, formData, { headers });
  }

  put (pelicula: PeliculaModel): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    const formData = this.getFormData(pelicula);
    return this.http.put(this.urlBase, formData, { headers });
  }

  delete (id: Number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.delete(`${this.urlBase}/${id}`, { headers });
  }

  getPortada (id: Number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

    return this.http.get(`${this.urlBase}/portada/${id}`, { headers });
  }

  getPelicula(id: Number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
  
    return this.http.get<PeliculaModel>(`${this.urlBase}/${id}`, { headers });
  }

  getFile(id: Number): Observable<Blob> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    const options = {
      responseType: 'blob' as 'json',
      headers
    };
    return this.http.get<Blob>(`${this.urlBase}/descargar/${id}`, options);
  }
}
