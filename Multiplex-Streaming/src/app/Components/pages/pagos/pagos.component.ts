import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AbonadosService } from 'src/app/Services/abonados.service';
import { PagosService } from 'src/app/Services/pagos.service';

declare var window: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  Pagos: any[] = [];
  esAdmin: boolean = false;
  abonadosHabilitados: any[] = [];
  modalRef: any;
  selectedAbonadoId: number = 0;
  nuevoPago: any = {
      idPago: 0,
      fechaPago: '',
      isPagado: false,
      total: 0
  };

  constructor(private abonadosService: AbonadosService, private pagosService: PagosService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.esAdmin.subscribe(res=>( this.esAdmin=res));
    this.onAbonadosPagos();
    this.modalRef = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.selectedAbonadoId = 0;
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

  agregarPago() {
    const idUsuario = this.selectedAbonadoId;

    if (!idUsuario) {
      // Mostrar mensaje de error o manejar caso en el que no se ha seleccionado un abonado
      return;
    }

    const nuevoPagoObj = {
      idPago: this.nuevoPago.idPago,
      fechaPago: this.nuevoPago.fechaPago,
      isPagado: this.nuevoPago.isPagado,
      total: this.nuevoPago.total
    };

    this.pagosService.addPago(idUsuario, nuevoPagoObj).subscribe(
      (response) => {
        console.log('Pago agregado correctamente:', response);
        this.onAbonadosPagos();
        this.closeModal();
      },
      (error) => {
        console.error('Error al agregar el pago:', error);
      }
    );
  }
  
  actualizarPago(idUsuario: number, pago: any) {
    const pagoActualizado = {
      idPago: pago.idPago,
      fechaPago: pago.fechaPago,
      isPagado: pago.isPagado,
      total: pago.total,
    };
  
    this.pagosService.updatePago(idUsuario, pagoActualizado).subscribe(
      (response) => {
        console.log('Pago actualizado correctamente:', response);
        alert("Pago actualizado correctamente");
        this.onAbonadosPagos();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al actualizar el pago:', error);
        alert("Error al actualizar el pago");
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

  openModal() {
    this.modalRef.show();
  }

  closeModal() {
    this.modalRef.hide();
    this.selectedAbonadoId = 0;
    this.nuevoPago = {
      idPago: 0,
      fechaPago: '',
      isPagado: false,
      total: 0
    };
  }
}
