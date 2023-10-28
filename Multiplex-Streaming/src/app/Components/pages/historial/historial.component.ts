import { Component, OnInit } from '@angular/core';
import { hsPlService } from 'src/app/Services/hsPeliculas.service';
import { hsSrService } from 'src/app/Services/hsSeries.service';
import {PeliculaModel} from 'src/app/models/peliculaModel';
import { SerieModel } from 'src/app/models/serieModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private hsPlService: hsPlService, private hsSrService: hsSrService, private router: Router) {}

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
    //llama al metodo que trae el historial de peliculas.
    this.getHsPeliculas();
    //llama al metodo que trae el historial de series.    
    this.getHsSeries();

    //Hardcodeo para probar post de hsPeliculas>
    /*this.hsPlService.post(19).subscribe({
      next: data => {
        if (data) {
          this.getHsPeliculas();
        }
      },
      error: error => {
      }
    });*/
    //Hardcodeo para probar delete de hsSeries>
    /*this.hsSrService.delete(9).subscribe({
      next: data => {
        if (data) {
          this.getHsSeries();
        }
      },
      error: error => {
      }
    });*/
    
  }

  //metodo que trae las peliculas vistas por el usuario logueado.
  getHsPeliculas () {
    this.hsPlService.get().subscribe({
      next: data => {
        console.log(data);
        this.peliculas = data;
      },
      error: error => { console.error('Ocurrió un error al obtener el historial de películas:', error);
      }
    });
  }

  //metodo que trae historial de series
  getHsSeries (){
    this.hsSrService.get().subscribe({
      next: data => {
        console.log(data);
        this.series = data;
      },
      error: error => { console.error('Ocurrió un error al obtener el historial de películas:', error);
      }
    });
  }

  //eliminar una PELICULA del historial mediante ID.
  deleteHsPelicula(peliculaId:Number){
    this.hsPlService.delete(peliculaId).subscribe({
      next: data => {
        if (data) {
          this.getHsPeliculas();
        }
      },
      error: error => {
      }
    });
  }

  //eliminar una SERIE del historial mediante ID.
  deleteHsSerie(serieId:Number){
    this.hsSrService.delete(serieId).subscribe({
      next: data => {
        if (data) {
          this.getHsSeries();
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

  getPortada (model: PeliculaModel) {
    return `http://localhost:5000/api/peliculas/portada/${model.id}`
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
