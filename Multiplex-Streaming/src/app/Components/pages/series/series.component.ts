import { Component, OnInit } from '@angular/core';
import { CapituloModel } from 'src/app/models/capituloModel';
import { SerieModel } from 'src/app/models/serieModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { SerieService } from 'src/app/Services/series.service';

declare var window: any;

@Component
({
    selector: 'app-series',
    templateUrl: './series.componentt.html',
    styleUrls: ['./series.component.css']
})

export class SeriesComponent implements OnInit
{
    series: SerieModel[] = [];
    serie: SerieModel = {
        id: 0,
        nombre: '',
        descripcion: '',
        cantidadCapitulos: 0,
        url: '',
    };
    formModal: any;
    capitulos: CapituloModel[] = [];
    capitulo: CapituloModel ={
        idSr: 0,
        idCp: 0,
        nombreCp: '',
        descripcionCp: '',
        duracionCp: '',
        urlCp: ''
    }
    editing: boolean = false;
    //generoSelected?: GeneroModel = new GeneroModel();
    esAdmin: boolean = false;

    constructor (private serieService: SerieService, private authService: AuthService){}

    ngOnInit(): void 
    {
        this.getSeries();
        this.getCapitulos();
        this.formModal = new window.bootstrap.Modal(
          document.getElementById('myModal')
        );
        this.esAdmin = this.authService.esAdmin;
    }

    //GET all series
    getSeries() 
    {
        this.serieService.get().subscribe({
            next: data => {
              console.log(data);
              this.series = data;
            },
            error: error => {
            }
        });
    }

    getCapitulos()
    {
        this.serieService.getCapitulos().subscribe({
            next: data => {
              this.capitulos = data;
            },
            error: error => {
            }
          });
    }

    guardarSerie()
    {
        if(this.serie.nombre && this.serie.descripcion && this.serie.cantidadCapitulos && this.serie.url)
        {
            this.serie.url = this.serie.url.replace('C:\\fakepath\\', 'assets/img/');
        }
     
        if (this.editing) {
            this.serieService.put(this.serie).subscribe({
              next: data => {
                if (data) {
                  this.closeModal();
                }
              },
              error: error => {
              }
            })
          } else {
            this.serieService.post(this.serie).subscribe({
              next: data => {
                if (data) {
                  this.closeModal();
                }
              },
              error: error => {
              }
            })
          }
    }

    //editarSerie(){}

    openModal() {
        this.formModal.show();
    }

    closeModal() {
        this.editing = false;
        this.formModal.hide();
        this.getSeries();
        this.resetForm();
    }

    resetForm() {
        //this.generoSelected = new GeneroModel();
        this.serie = {
          id: 0,
          nombre: '',
          descripcion: '',
          cantidadCapitulos: 0,
          url: '',
        };
      }

}