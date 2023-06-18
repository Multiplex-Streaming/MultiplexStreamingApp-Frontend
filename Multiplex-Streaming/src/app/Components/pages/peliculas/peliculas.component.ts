import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/Services/peliculas.service';
import { PeliculaModel } from 'src/app/models/peliculaModel';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {
  peliculas: PeliculaModel[] = [];

  constructor(private peliculaService: PeliculaService) { 
    
  }

  ngOnInit(): void {
    this.peliculaService.get().subscribe({
      next: data => {
        this.peliculas = data;
      },
      error: error => {
      }
    });
  }
}
