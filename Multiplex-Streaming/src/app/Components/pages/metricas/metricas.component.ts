import { Component } from '@angular/core';
import { MetricasService } from 'src/app/Services/metricas.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent {
 
  // Define propiedades para almacenar los datos
  topPeliculasData: any[] = [];
  topSeriesData: any[] = [];
  generosPeliculasData: any[] = [];
  generosSeriesData: any[] = [];
  usuariosPeliculasData: any[] = [];
  usuariosSeriesData: any[] = [];  

  view: [number, number] = [800, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  constructor( private metricasService: MetricasService) {
    this.getTopPeliculas();
    this.getTopSeries();
    this.getGenerosMasVistosPeliculas();
    this.getGenerosMasVistosSeries();
    this.getUsuariosMasVieronPeliculas();
    this.getUsuariosMasVieronSeries();
  }

  formatData(data: any[]): any[] {
      return data.map(item => ({
        name: item.item1,
        value: item.item2
    }));
  }

  formatData2(data: any[]): any[] {
    return data.map(item => ({
      name: item.titulo,
      value: item.cantidadVisualizaciones
    }));
  }
  
  getTopPeliculas() {
    this.metricasService.getTopPeliculas().subscribe(data => {
      this.topPeliculasData = this.formatData2(data);
    });
  }

  getTopSeries() {
    this.metricasService.getTopSeries().subscribe(data => {
      this.topSeriesData = this.formatData2(data);
    });
  }

  getGenerosMasVistosPeliculas() {
    this.metricasService.getGenerosMasVistosPeliculas().subscribe(data => {
      this.generosPeliculasData = this.formatData(data);
    });
  }

  getGenerosMasVistosSeries() {
    this.metricasService.getGenerosMasVistosSeries().subscribe(data => {
      this.generosSeriesData = this.formatData(data);
    });
  }

  getUsuariosMasVieronPeliculas() {
    this.metricasService.getUsuariosMasVieronPeliculas().subscribe(data => {
      this.usuariosPeliculasData = this.formatData(data);
    });
  }

  getUsuariosMasVieronSeries() {
    this.metricasService.getUsuariosMasVieronSeries().subscribe(data => {
      this.usuariosSeriesData = this.formatData(data);
    });
  }
}
