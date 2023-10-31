import { Component, OnInit } from '@angular/core';
import { hsSrService } from 'src/app/Services/hsSeries.service';
import { hsPlService } from 'src/app/Services/hsPeliculas.service';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { SerieModel } from 'src/app/models/serieModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendados',
  templateUrl: './recomendados.component.html',
  styleUrls: ['./recomendados.component.css']
})
export class RecomendadosComponent implements OnInit {

  constructor(private hsSrService: hsSrService, private hsPlService: hsPlService, private router: Router) {}

  peliculas: PeliculaModel[] = [];
  series: SerieModel[] = [];

  ngOnInit(): void {    
    this.hsSrService.getRecomendaciones().subscribe({
      next: data => {
        this.series = data;
      },
      error: error => {
      }
    });
    this.hsPlService.getRecomendaciones().subscribe({
      next: data => {
        this.peliculas = data;
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

  getPortadaPelicula (model: PeliculaModel) {
    return `http://localhost:5000/api/peliculas/portada/${model.id}`
  }
  getPortadaSerie (model: SerieModel) {
    return `http://localhost:5000/api/series/portada/${model.id}`
  }
}
