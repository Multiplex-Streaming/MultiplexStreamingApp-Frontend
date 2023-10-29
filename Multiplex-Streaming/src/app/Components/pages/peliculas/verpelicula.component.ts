import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from 'src/app/Services/peliculas.service';

@Component({
  selector: 'app-ver-pelicula',
  templateUrl: './verpelicula.component.html'
})
export class VerPeliculaComponent implements OnInit {

    peliculaId: Number = 0;

    source: String = '';

    loaded: Boolean = false;

  constructor(private route: ActivatedRoute, private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.peliculaId = Number(params.get('id'));

        this.peliculaService.getFile(this.peliculaId).subscribe({
          next: blob => {
            this.source = URL.createObjectURL(blob);
            this.loaded = true;
          },
          error: error => { console.error('Ocurrió un error:', error);
          }
      });
    });
  }
}