import { Component,Input } from '@angular/core';
import { fvPlService } from 'src/app/Services/fvPeliculas.service';
import { fvSrService } from 'src/app/Services/fvSeries.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fav',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css']
})
export class FavoritoComponent {
    @Input() peliculaId: Number = 0;
    @Input() serieId: Number = 0;
    @Input() esBoton: Boolean = false;
    @Input() active: Boolean = false;

  constructor(private fvPlService: fvPlService, private fvSrService: fvSrService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  onFavClick () {
    if (this.active) {
      if (Number(this.peliculaId) > 0) {
        this.deleteFvPelicula();
      } else {
        this.deleteFvSerie();
      }
    }

    if (Number(this.peliculaId) > 0) {
      this.createFvPelicula();
    } else {
      this.createFvSerie();
    }
    
    this.active = !this.active;
  }

  createFvPelicula() {
    this.fvPlService.post(this.peliculaId).subscribe({
      next: data => {
        if (data) {
        }
      },
      error: error => {
      }
    });
  }

  createFvSerie() {
    this.fvSrService.post(this.serieId).subscribe({
      next: data => {
        if (data) {
        }
      },
      error: error => {
      }
    });
  }

  deleteFvPelicula(){
    this.fvPlService.delete(this.peliculaId).subscribe({
      next: data => {
        if (data) {
        }
      },
      error: error => {
      }
    });
  }

  deleteFvSerie(){
    this.fvSrService.delete(this.serieId).subscribe({
      next: data => {
        if (data) {
        }
      },
      error: error => {
      }
    });
  }
}
