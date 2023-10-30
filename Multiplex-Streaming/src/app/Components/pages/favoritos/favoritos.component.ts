import { Component, OnInit } from '@angular/core';
import { fvPlService } from 'src/app/Services/fvPeliculas.service';
import { fvSrService } from 'src/app/Services/fvSeries.service';
import {PeliculaModel} from 'src/app/models/peliculaModel';
import { SerieModel } from 'src/app/models/serieModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  constructor(private fvPlService: fvPlService, private fvSrService: fvSrService, private router: Router) {}

  peliculas: PeliculaModel[] = [];
  pelicula: PeliculaModel = {
    portadaFile: null,
    id: 0,
    titulo: '',
    portada: '',
    descripcion: '',
    elenco: '',
    url: '',
    duracion: '0',
    file: null
  };
  series: SerieModel[] = [];
  serie: SerieModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    cantidadCapitulos: 0,
    url: '',
    portada: '',
    portadaFile: null
  };
  esAdmin: boolean = false;

  ngOnInit(): void {
    this.getFvPeliculas();
    this.getFvSeries();
  }

  getFvPeliculas (){
    this.fvPlService.get().subscribe({
      next: data => {
        console.log(data);
        this.peliculas = data;
      },
      error: error => { console.error('Ocurrió un error al obtener las peliculas favoritas:', error);
      }
    });
  }

  getFvSeries(){
    this.fvSrService.get().subscribe({
      next: data => {
        console.log(data);
        this.series = data;
      },
      error: error => { console.error('Ocurrió un error al obtener el historial de películas:', error);
      }
    });
  }

  /*postFvPelicula(peliculaId:Number){
    this.fvPlService.post(peliculaId).subscribe({
      next: data => {
        if (data) {
          this.getFvPeliculas();
        }
      },
      error: error => {
      }
    });
  }*/

  /*postFvSerie(serieId:Number){
    this.fvSrService.post(serieId).subscribe({
      next: data => {
        if (data) {
          this.getFvSeries();
        }
      },
      error: error => {
      }
    });
  }*/

  deleteFvPelicula(peliculaId:Number){
    this.fvPlService.delete(peliculaId).subscribe({
      next: data => {
        if (data) {
          this.getFvPeliculas();
        }
      },
      error: error => {
      }
    });
  }

  deleteFvSerie(serieId:Number){
    this.fvSrService.delete(serieId).subscribe({
      next: data => {
        if (data) {
          this.getFvSeries();
        }
      },
      error: error => {
      }
    });
  }

  verPelicula (id: Number) {
    this.router.navigate(['/ver', id]);
  }

  verSerie (id: Number) {
    this.router.navigate(['/ver-serie', id]);
  }

  getPeliculaPortada (model: PeliculaModel) {
    return `http://localhost:5000/api/peliculas/portada/${model.id}`
  }

  getSeriePortada (model: SerieModel) {
    return `http://localhost:5000/api/series/portada/${model.id}`
  }
  
  resetForm() {
    this.pelicula = {
      portadaFile: null,
      id: 0,
      portada: '',
      titulo: '',
      descripcion: '',
      elenco: '',
      url: '',
      duracion: '0',
      file: null
    };

    this.serie = {
      id: 0,
      nombre: '',
      descripcion: '',
      cantidadCapitulos: 0,
      url: '',
      portada: '',
      portadaFile: null
    };
  }
}
