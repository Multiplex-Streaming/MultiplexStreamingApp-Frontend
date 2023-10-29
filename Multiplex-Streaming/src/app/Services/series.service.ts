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

    getSerieFormData (serie: SerieModel): FormData {
        //form data
        const formData = new FormData();
        const portadaFile = serie.portadaFile;
        formData.append('Id', serie.id.toString());
        formData.append('Nombre', serie.nombre.toString());
        formData.append('Descripcion', serie.descripcion.toString());
        formData.append('CantidadCapitulos', serie.cantidadCapitulos.toString());
        if (portadaFile != null)
          formData.append('PortadaFile', portadaFile, portadaFile.name);
    
          return formData;
      }

      getCapituloFormData (capitulo: CapituloModel): FormData {
        //form data
        const formData = new FormData();
        const portadaFile = capitulo.portadaFile;
        const file = capitulo.file;
        formData.append('IdSr', capitulo.idSr.toString());
        formData.append('IdCp', capitulo.idCp.toString());
        formData.append('NombreCp', capitulo.nombreCp.toString());
        formData.append('DescripcionCp', capitulo.descripcionCp.toString());
        formData.append('DuracionCp', capitulo.duracionCp.toString());
        formData.append('Temporada', capitulo.temporada.toString());
        if (portadaFile != null)
          formData.append('PortadaFile', portadaFile, portadaFile.name);
        if (file != null)
          formData.append('File', file, file.name);
    
          return formData;
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
        const formData = this.getSerieFormData(serie);
        return this.http.post(this.urlBase, formData, {headers});
    }

    //Editar Serie
    put (serie: SerieModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        const formData = this.getSerieFormData(serie);
        return this.http.put(this.urlBase, formData, { headers });
    }

    //Eliminar Serie
    delete (id: Number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
    
        return this.http.delete(`${this.urlBase}/${id}`, { headers });
    }

    //Agregar capitulo
    postCapitulo (capitulo: CapituloModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        const formData = this.getCapituloFormData(capitulo);
        return this.http.post(this.urlBase + '/capitulo', formData, {headers});
    }

    //Editar capitulo
    putCapitulo (capitulo: CapituloModel): Observable<any>
    {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        const formData = this.getCapituloFormData(capitulo);
        return this.http.put(this.urlBase + '/capitulo', formData, { headers });
    }

    //Eliminar capitulo
    deleteCapitulo (id: Number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        return this.http.delete(`${this.urlBase}/capitulo/${id}`, { headers });
    }

    getSerie(id: Number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);

        return this.http.get<SerieModel>(`${this.urlBase}/${id}`, {headers});
    }

    getCapituloFile(id: Number): Observable<Blob> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.currentUser.Token}`);
        const options = {
            responseType: 'blob' as 'json',
            headers
          };
        return this.http.get<Blob>(`${this.urlBase}/descargar/${id}`, options);
    }
}

