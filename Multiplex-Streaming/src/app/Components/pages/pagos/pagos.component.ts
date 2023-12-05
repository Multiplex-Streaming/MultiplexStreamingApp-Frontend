import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AbonadosService } from 'src/app/Services/abonados.service';
import { PagosService } from 'src/app/Services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  Pagos: any[] = [];
  esAdmin: boolean = false;
  abonadosHabilitados: any[] = [];

  constructor(private abonadosService: AbonadosService, private pagosService: PagosService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.esAdmin.subscribe(res=>( this.esAdmin=res));
    this.onAbonadosPagos();
  }

  onAbonadosPagos(){
    this.abonadosService.getAllUsuariosConPagos().subscribe({
      next: data => {
        this.Pagos = data;
      },
      error: error => {
      }
    });
  }

  onMontoBlur(event: any, pago: any, idUsuario: number) {
    console.log(`Nuevo monto para ${pago}: ${event.target.innerText}`);
    pago.total = event.target.innerText;
    //this.actualizarPago(idUsuario, pago);
  }

  onPagadoBlur(event: any, pago: any, idUsuario: number) {
    console.log(`Nuevo estado de pago para ${pago}: ${event.target.innerText}`);
    pago.isPagado = event.target.innerText;
    //this.actualizarPago(idUsuario, pago);
  }

  agregarPago(idUsuario: number, nuevoPago: any) {
    const nuevoPagoObj = {
      idPago: nuevoPago.idPago,
      fechaPago: nuevoPago.fechaPago,
      isPagado: nuevoPago.isPagado,
      total: nuevoPago.total
    };
  
    this.pagosService.addPago(idUsuario, nuevoPagoObj).subscribe(
      (response) => {
        // Lógica después de agregar el pago
        console.log('Pago agregado correctamente:', response);
        // Actualizar la lista de pagos
        this.onAbonadosPagos();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al agregar el pago:', error);
      }
    );
  }  
  
  actualizarPago(idUsuario: number, pago: any) {
    console.log("pago actual:", pago);
    const pagoActualizado = {
      idPago: pago.idPago,
      fechaPago: pago.fechaPago,
      isPagado: pago.isPagado,
      total: pago.total,
    };

    console.log('Pago actualizado:', pagoActualizado);
  
    this.pagosService.updatePago(idUsuario, pagoActualizado).subscribe(
      (response) => {
        // Lógica después de actualizar el pago
        console.log('Pago actualizado correctamente:', response);
        // Actualizar la lista de pagos
        this.onAbonadosPagos();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al actualizar el pago:', error);
      }
    );
  }

  notificarAbonados() {
    this.pagosService.notificarAbonadosConPagosPendientes().subscribe(
      (response) => {
        //agregar mensaje alert
        alert("Se notificaron los abonados con pagos pendientes");
      },
      (error) => {
        // Manejo de errores
        alert("Error al notificar los abonados con pagos pendientes");
      }
    );
  }

  obtenerAbonadosHabilitados() {
    this.abonadosService.getAbonadosHabilitados().subscribe(
      (response) => {
        // Lógica después de obtener abonados habilitados
        this.abonadosHabilitados = response;
        console.log('Abonados habilitados:', response);
      },
      (error) => {
        // Manejo de errores
        console.error('Error al obtener abonados habilitados:', error);
      }
    );
  }
}
