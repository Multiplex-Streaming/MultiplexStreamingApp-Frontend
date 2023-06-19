import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/Services/peliculas.service';
import { GeneroModel } from 'src/app/models/generoModel';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';

declare var window: any;

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas: PeliculaModel[] = [];
  pelicula: PeliculaModel = {
    id: 0,
    titulo: '',
    descripcion: '',
    elenco: '',
    url: '',
    duracion: '0'
  };
  formModal: any;
  generos: GeneroModel[] = [];
  editing: boolean = false;
  generoSelected?: GeneroModel = new GeneroModel();
  esAdmin: boolean = false;

  constructor(private peliculaService: PeliculaService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.getPeliculas();
    this.getGeneros();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.esAdmin = this.authService.esAdmin;
  }

  getPeliculas() {
    this.peliculaService.get().subscribe({
      next: data => {
        console.log(data);
        this.peliculas = data;
      },
      error: error => {
      }
    });
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

  openModal() {
    this.formModal.show();
  }

  closeModal() {
    this.editing = false;
    this.formModal.hide();
    this.getPeliculas();
    this.resetForm();
  }

  guardarPelicula() {
    if (this.pelicula.titulo && this.pelicula.descripcion && this.pelicula.elenco && this.pelicula.url && this.pelicula.duracion && this.generoSelected) {
      this.pelicula.generos = [this.generoSelected];
      this.pelicula.url = this.pelicula.url.replace('C:\\fakepath\\', 'assets/img/');
      if (this.editing) {
        this.peliculaService.put(this.pelicula).subscribe({
          next: data => {
            if (data) {
              this.closeModal();
            }
          },
          error: error => {
          }
        })
      } else {
        this.peliculaService.post(this.pelicula).subscribe({
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

  editarPelicula(pelicula: PeliculaModel) {
    // Asignar los valores de la película seleccionada al formulario
    this.pelicula = { ...pelicula };
    this.generoSelected = pelicula.generos?.[0];
    console.log(this.generoSelected);
    this.editing = true;
    // Abrir el modal
    this.openModal();
  }

  eliminarPelicula(pelicula: PeliculaModel) {
    // Eliminar la película de la lista
    this.peliculaService.delete(pelicula.id).subscribe({
      next: data => {
        if (data) {
          this.getPeliculas();
        }
      },
      error: error => {
      }
    })
  }

  resetForm() {
    this.generoSelected = new GeneroModel();
    this.pelicula = {
      id: 0,
      titulo: '',
      descripcion: '',
      elenco: '',
      url: '',
      duracion: '0'
    };
  }
}