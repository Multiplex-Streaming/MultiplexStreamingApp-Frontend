import { Component } from '@angular/core';
import { SearchService } from 'src/app/Services/search.service';
import { SerieModel } from 'src/app/models/serieModel';
import { PeliculaModel } from 'src/app/models/peliculaModel';
import { SearchModel } from 'src/app/models/searchModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})

export class AutocompleteComponent {
  searchTerm: string = '';
  searchResults: SearchModel[] = [];
  showResults: boolean = false;

  constructor(private searchSv : SearchService, private router:Router){}

  onSearch() {
    this.searchResults = [];
    this.showResults = this.searchTerm.length > 0;
    this.searchSv.getPl(this.searchTerm).subscribe({
        next: data => {
          
         this.searchResults = this.searchResults.concat(data.map<SearchModel>(x => ({
            SerieId : 0,
            PeliculaId : x.id,
            Titulo : x.titulo
        })))
        },
        error: error => { console.error('Ocurrió un error al obtener la película:', error);
        }
      });

      this.searchSv.getSr(this.searchTerm).subscribe({
        next: data => {
          console.log(data);
          this.searchResults = this.searchResults.concat(data.map<SearchModel>(x => ({
            SerieId : x.id,
            PeliculaId : 0,
            Titulo : x.nombre
        })))
        },
        error: error => { console.error('Ocurrió un error al obtener la película:', error);
        }
      });
  }

  onResultSelected(result: SearchModel) {
    this.searchTerm = result.Titulo; // Opcional: Llenar el campo de búsqueda con el resultado seleccionado.
    this.showResults = false;
    if(Number (result.PeliculaId) > 0)
        this.verPelicula(result.PeliculaId);
    else
        this.verSerie(result.SerieId);
  }

  verSerie(id: Number) {
    this.router.navigate(['/ver-serie', id]);
  }
  verPelicula (id: Number) {
    this.router.navigate(['/ver', id]);
  }
}
