import { Component, OnInit } from '@angular/core';
import { hsSrService } from 'src/app/Services/hsSeries.service';
import {PeliculaModel} from 'src/app/models/peliculaModel';
import { SerieModel } from 'src/app/models/serieModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendados',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private hsSrService: hsSrService, private router: Router) {}

  peliculas: PeliculaModel[] = [];
  series: SerieModel[] = [];

  ngOnInit(): void {    
    
  }

  getRecomendados () {
    
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
}
