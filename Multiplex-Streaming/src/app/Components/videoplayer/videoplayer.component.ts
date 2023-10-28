import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/Services/peliculas.service';
import { hsPlService } from 'src/app/Services/hsPeliculas.service';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { ActivatedRoute } from '@angular/router';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoplayerComponent implements OnInit {
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

  peliculaId: Number = 0;

  source: String = '';

  minutes: Number = 0;

  seconds: Number = 0;

  constructor(private peliculaService: PeliculaService, private historial: hsPlService, private route: ActivatedRoute,
    private api: VgApiService) { 
      
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.peliculaId = Number(params.get('id'));

      this.peliculaService.getPelicula(this.peliculaId).subscribe({
        next: data => {
          this.pelicula = data;
          this.source = data.url;
        },
        error: error => { console.error('Ocurrió un error:', error);
        }
      });
    });
  }

  playerReady(api: VgApiService) {
    this.api = api;
    api.getDefaultMedia().subscriptions.play.subscribe(this.play.bind(this));
    // api.getDefaultMedia().subscriptions.pause.subscribe(this.pause.bind(this));
  }

  play() {
    this.historial.post(this.peliculaId).subscribe({
      next: data => {
      },
      error: error => { console.error('Ocurrió un error:', error);
      }
    });
    this.historial.getUltimoHistorialPelicula(this.peliculaId).subscribe({
      next: data => {
        if (data) {
          this.minutes = data.minutos;
          this.seconds = data.segundos;
          const total = this.api.time.total;
          const totalSeconds = Math.floor((data.minutos * 60) + data.segundos);
          this.api.seekTime(totalSeconds);
        }
      },
      error: error => { console.error('Ocurrió un error:', error);
      }
    });
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(this.timeUpdate.bind(this));
  }

  pause() {
    this.historial.put(this.peliculaId, this.minutes, this.seconds).subscribe({
        next: data => {
        },
        error: error => { console.error('Ocurrió un error:', error);
        }
    });
  }

  timeUpdate () {
    const currentTimeInSeconds = this.api.currentTime;
    this.minutes = Math.floor(currentTimeInSeconds / 60);
    this.seconds = Math.floor(currentTimeInSeconds % 60);
    this.historial.put(this.peliculaId, this.minutes, this.seconds).subscribe({
      next: data => {
      },
      error: error => { console.error('Ocurrió un error:', error);
      }
    });
  }
}