import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/Services/peliculas.service';
import { GeneroModel } from 'src/app/models/generoModel';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas: PeliculaModel[] = [];
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
  formModal: any;
  generos: GeneroModel[] = [];
  editing: boolean = false;
  generoSelected?: GeneroModel = new GeneroModel();
  esAdmin: boolean = false;

  constructor(private peliculaService: PeliculaService, private authService: AuthService, private router: Router) { 
    
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
    if (this.pelicula.titulo && this.pelicula.descripcion && this.pelicula.elenco && this.pelicula.duracion && this.generoSelected) {
      this.pelicula.generos = [this.generoSelected];
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
      portadaFile: null,
      id: 0,
      portada: '',
      titulo: '',
      descripcion: '',
      elenco: '',
      url: '',
      duracion: '0',
      file: null
    };
  }

  onPortadaFileSelected(event: any){
    this.pelicula.portadaFile=<File>event.target.files[0]
  }

  onFileSelected(event: any){
    this.pelicula.file=<File>event.target.files[0]
  }

  getPortada (model: PeliculaModel) {
    return `http://localhost:5000/api/peliculas/portada/${model.id}`
  }
  
  verPelicula (id: Number) {
    this.router.navigate(['/ver', id]);
  }
}