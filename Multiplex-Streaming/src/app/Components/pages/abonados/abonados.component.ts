import { Component, OnInit } from '@angular/core';
import { AbonadosService } from 'src/app/Services/abonados.service';
import { AbonadoModel } from 'src/app/models/abonadoModel';
import { AuthService } from 'src/app/Services/Auth/auth.service';

declare var window: any;

@Component({
  selector: 'app-abonados',
  templateUrl: './abonados.component.html',
  styleUrls: ['./abonados.component.css']
})
export class AbonadosComponent implements OnInit {
  abonados: AbonadoModel[] = [];
  esAdmin: boolean = false;

  constructor(private abonadosService: AbonadosService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.esAdmin = this.authService.esAdmin;
    this.getAbonados();
  }

  getAbonados() {
    this.abonadosService.get().subscribe({
      next: data => {
        this.abonados = data;
      },
      error: error => {
      }
    });
  }

  actualizarEstadoAbonado(id: Number, status: String) {
    // Eliminar la película de la lista
    this.abonadosService.updateStatus(id, status).subscribe({
      next: data => {
        if (data) {
          this.getAbonados();
        }
      },
      error: error => {
      }
    })
  }
}