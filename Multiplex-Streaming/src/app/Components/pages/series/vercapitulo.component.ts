import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from 'src/app/Services/series.service';

@Component({
  selector: 'app-ver-capitulo',
  templateUrl: './vercapitulo.component.html'
})
export class VerCapituloComponent implements OnInit {

    serieId: Number = 0;

    capituloId: Number = 0;

    source: String = '';

    loaded: Boolean = false;

  constructor(private route: ActivatedRoute, private serieService: SerieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.serieId = Number(params.get('id'));

        this.capituloId = Number(params.get('capId'));

        this.serieService.getCapituloFile(this.capituloId).subscribe({
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