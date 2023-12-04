import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AbonadosService } from 'src/app/Services/abonados.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  Pagos: any[] = [];
  esAdmin: boolean = false;

  constructor(private abonadosService: AbonadosService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.esAdmin.subscribe(res=>( this.esAdmin=res));
    this.onAbonadosPagos();
  }

  onAbonadosPagos(){
    this.abonadosService.getAllUsuariosConPagos().subscribe({
      next: data => {
        this.Pagos = data;
        console.log(this.Pagos);
      },
      error: error => {
      }
    });
  }

  onMontoBlur(event: any, pago: any) {
    // Lógica para guardar el monto editado en el backend
    console.log(`Nuevo monto para ${pago.nombreCompleto}: ${event.target.innerText}`);
    pago.monto = event.target.innerText;
  }

  onPagadoBlur(event: any, pago: any) {
    // Lógica para guardar el estado de pagado editado en el backend
    console.log(`Nuevo estado de pago para ${pago.nombreCompleto}: ${event.target.innerText}`);
    pago.pagado = event.target.innerText;
  }

}
