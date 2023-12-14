import { Component, OnInit } from '@angular/core';
import { CapituloModel } from 'src/app/models/capituloModel';
import { SerieModel } from 'src/app/models/serieModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PeliculaService } from 'src/app/Services/peliculas.service';
import { SerieService } from 'src/app/Services/series.service';
import { GeneroModel } from 'src/app/models/generoModel';
import { Router } from '@angular/router';

declare var window: any;

@Component
({
    selector: 'app-series',
    templateUrl: './series.component.html',
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
        portada: '',
        portadaFile: null
    };
    serieModal: any;
    capituloModal: any;
    capitulos: CapituloModel[] = [];
    capitulo: CapituloModel ={
        idSr: 0,
        idCp: 0,
        nombreCp: '',
        descripcionCp: '',
        duracionCp: '',
        urlCp: '',
        portadaFile: null,
        file: null,
        temporada: 0
    }
    editing: boolean = false;
    generos: GeneroModel[] = [];
    esAdmin: boolean = false;
    selectedGenero?: GeneroModel = new GeneroModel();

    constructor (private serieService: SerieService, private peliculaService: PeliculaService, private authService: AuthService,
      private router: Router) {

    }

    ngOnInit(): void 
    {
        this.getSeries();
        this.getGeneros();
        this.serieModal = new window.bootstrap.Modal(
          document.getElementById('serieModal')
        );
        this.capituloModal = new window.bootstrap.Modal(
          document.getElementById('capituloModal')
        );
        this.authService.esAdmin.subscribe(res=>( this.esAdmin=res));
        // this.esAdmin = this.authService.esAdmin;
    }

    getGeneros() {
      this.peliculaService.getGeneros().subscribe({
        next: data => {
          this.generos = data;
        },
        error: error => {
        }
      });
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

    guardarSerie(){
      if (this.serie.nombre && this.serie.descripcion && this.selectedGenero) {
        this.serie.generos = [this.selectedGenero];
        if (this.editing) {
          console.log(this.serie);
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
    }

    guardarCapitulo() {
      if (this.editing) {
        this.serieService.putCapitulo(this.capitulo).subscribe({
          next: data => {
            if (data) {
              this.closeCapituloModal();
            }
          },
          error: error => {
          }
        })
      } else {
        this.serieService.postCapitulo(this.capitulo).subscribe({
          next: data => {
            if (data) {
              this.closeCapituloModal();
            }
          },
          error: error => {
          }
        })
      }
    }

    editarSerie(serie: SerieModel) {
      this.serie = { ...serie };
      this.selectedGenero = serie.generos?.[0];
      this.editing = true;
      this.openSerieModal();
    }

    eliminarSerie(serie: SerieModel) {
      this.serieService.delete(serie.id).subscribe({
        next: data => {
          if (data) {
            this.getSeries();
          }
        },
        error: error => {
        }
      })
    }

    editarCapitulo(capitulo: CapituloModel) {
      this.capitulo = { ...capitulo };
      this.editing = true;
      this.openCapituloModal();
    }

    eliminarCapitulo(capitulo: CapituloModel) {
      this.serieService.deleteCapitulo(capitulo.idCp).subscribe({
        next: data => {
          if (data) {
            this.getSeries();
          }
        },
        error: error => {
        }
      })
    }

    openSerieModal() {
        this.serieModal.show();
    }

    openCapituloModal() {
      this.capituloModal.show();
    }

    openNuevoCapituloModal(id: Number) {
      this.capitulo.idSr = id;
      this.capituloModal.show();
    }

    closeModal() {
        this.editing = false;
        this.serieModal.hide();
        this.getSeries();
        this.resetForm();
    }

    closeCapituloModal() {
      this.editing = false;
      this.capituloModal.hide();
      this.getSeries();
      this.resetCapituloForm();
    }

    resetForm() {
        this.serie = {
          id: 0,
          portada: '',
          nombre: '',
          descripcion: '',
          cantidadCapitulos: 0,
          url: '',
          portadaFile: null
        };
      }

      resetCapituloForm() {
        this.capitulo = {
          idSr: 0,
          idCp: 0,
          nombreCp: '',
          descripcionCp: '',
          duracionCp: '',
          urlCp: '',
          portadaFile: null,
          file: null,
          temporada: 0
        }
      }
    
    onPortadaSerieSelected(event: any) {
      this.serie.portadaFile = <File>event.target.files[0]
    }

    onPortadaCapituloSelected(event: any) {
      this.capitulo.portadaFile = <File>event.target.files[0]
    }

    onFileSelected(event: any) {
      this.capitulo.file = <File>event.target.files[0]
    }

    getPortada (model: SerieModel) {
      return `http://localhost:5000/api/series/portada/${model.id}`
    }

    verSerie(id: Number) {
      this.router.navigate(['/ver-serie', id]);
    }
}