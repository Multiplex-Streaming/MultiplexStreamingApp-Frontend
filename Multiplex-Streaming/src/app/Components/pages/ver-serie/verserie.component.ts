import { Component, OnInit } from '@angular/core';
import { SerieService } from 'src/app/Services/series.service';
import { CapituloModel } from 'src/app/models/capituloModel';
import { SerieModel } from 'src/app/models/serieModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verserie',
  templateUrl: './verserie.component.html',
  styleUrls: ['./verserie.component.css']
})
export class VerSerieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private serieService: SerieService) {
    
  }

  capitulos: CapituloModel[] = [];
  
  serie: SerieModel = {
    id: 0,
    nombre: '',
    descripcion: '',
    cantidadCapitulos: 0,
    url: '',
    portada: '',
    portadaFile: null
  };
  
  cantTemporadas: Number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serieId = Number(params.get('id'));

      this.serieService.getSerie(serieId).subscribe({
        next: data => {
          this.serie = data;
          this.capitulos = data.capitulos;
          console.log(this.capitulos);
        },
        error: error => {
        }
      });
    });
  }

  getPortada () {
    return `http://localhost:5000/api/series/portada/${this.serie.id}`
  }

  getPortadaCapitulo (id: Number) {
    return `http://localhost:5000/api/series/capitulo/portada/${id}`
  }

  verCapitulo(id: Number) {
    this.router.navigate(['/ver-capitulo', this.serie.id, id]);
  }
}
