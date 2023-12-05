import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { hsPlService } from 'src/app/Services/hsPeliculas.service';
import { hsSrService } from 'src/app/Services/hsSeries.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { SafeUrl,DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoplayerComponent {
  @Input() peliculaId: Number = 0;

  @Input() serieId: Number = 0;

  @Input() source: String = '';

  _source: SafeUrl | undefined;

  minutes: Number = 0;

  seconds: Number = 0;

  constructor(private historialPelicula: hsPlService, private historialSerie: hsSrService, private api: VgApiService, private sanitizer: DomSanitizer) { 
      
  }

  playerReady(api: VgApiService) {
    // this._source = this.sanitizer.bypassSecurityTrustUrl(this.source.toString());
    this.api = api;
    api.getDefaultMedia().subscriptions.play.subscribe(this.play.bind(this));
  }

  play() {
    if (Number(this.peliculaId) > 0) {
      this.saveHistorialPelicula();
    } else {
      this.saveHistorialSerie();
    }
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(this.timeUpdate.bind(this));
  }

  pause() {
    if (Number(this.peliculaId) > 0) {
      this.updateHistorialPelicula();
    }
  }

  timeUpdate () {
    const currentTimeInSeconds = this.api.currentTime;
    this.minutes = Math.floor(currentTimeInSeconds / 60);
    this.seconds = Math.floor(currentTimeInSeconds % 60);
    if (Number(this.peliculaId) > 0) {
      this.updateHistorialPelicula();
    }
  }

  saveHistorialPelicula () {
    this.historialPelicula.post(this.peliculaId).subscribe({
      next: data => {
      },
      error: error => {}
    });
    this.historialPelicula.getUltimoHistorialPelicula(this.peliculaId).subscribe({
      next: data => { 
        if (data) {
          this.minutes = data.minutos;
          this.seconds = data.segundos;
          const totalSeconds = Math.floor((data.minutos * 60) + data.segundos);
          this.api.seekTime(totalSeconds);
        }
      },
      error: error => {}
    });
  }

  updateHistorialPelicula () {
    this.historialPelicula.put(this.peliculaId, this.minutes, this.seconds).subscribe({
      next: data => {
      },
      error: error => { console.error('Ocurrió un error:', error);
      }
    });
  }

  saveHistorialSerie () {
    this.historialSerie.post(this.serieId).subscribe({
      next: data => {
      },
      error: error => {
        
      }
    });
  }
}