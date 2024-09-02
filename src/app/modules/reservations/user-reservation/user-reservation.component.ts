import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyReservationComponent } from '../modify-reservation/modify-reservation.component';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';
import { IReserva } from '@sharedModule/models/IReserva';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { ICliente } from '@sharedModule/models/ICliente';
import { FiltrosReserva } from '@sharedModule/models/IFiltrosReserva';

@Component({
    selector: 'app-user-reservation',
    templateUrl: 'user-reservation.component.html',
    styleUrl: 'user-reservation.component.scss'
})

export class UserReservationComponent implements OnInit {

    public listAfiliadoServicio: Array<IReserva> = new Array();

    constructor(
        private dialog: MatDialog,
        private reservaService: ReservaService,
        private spinner: NgxSpinnerService,
        private utilitiesService: UtilitiesService
    ) { }

    ngOnInit() { 
        this.consultarReservas();
    }

    consultarReservas() {
        const cliente: ICliente = this.getObjectFromSessionStorage<ICliente>('cliente') || new ICliente();
        const filtros:FiltrosReserva = {
            codigoCliente: cliente.codigoCliente,
            fecha: null
        }
        this.spinner.show(); // Show Spinner
        this.reservaService.consultarReservasFiltro(filtros).pipe(
            tap((data) => {
                console.log(data);
              if (data.error) {
                this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar');
              } else {
                this.listAfiliadoServicio = data.data;
                this.utilitiesService.showSucessMessage(data.mensaje, '', 'Aceptar');
              }
            }),
            catchError((err) => {
              console.error("Error: ", err);
              this.utilitiesService.showErrorMessage(err.message)
              return of(null)
            }),
            finalize(() => this.spinner.hide() ) // Hiden Spinner
          ).subscribe();
    }

    private getObjectFromSessionStorage<T>(key: string): T | null {
        const item: string | null = sessionStorage.getItem(key);
        if (item) {
          try {
            return JSON.parse(item) as T;
          } catch (error) {
            console.error(`Error al parsear el objeto desde sessionStorage con la clave "${key}":`, error);
            sessionStorage.removeItem(key);
            return null;
          }
        }
        return null;
    }

    modificarReserva(codigo:string) {
        const dialogRef = this.dialog.open(ModifyReservationComponent, {
            width: '40%',
            height: '50%',
            data: {
                codigoReserva: codigo
            }
        });
        dialogRef.afterClosed().subscribe(() => {
            this.consultarReservas();
        });
    }

    eliminarReserva(codigo:string) {
        this.spinner.show(); // Show Spinner
        this.reservaService.cancelarReservation(codigo).pipe(
            tap((data) => {
                console.log(data);
              if (data.error) {
                this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar');
              } else {
                this.consultarReservas();
                this.utilitiesService.showSucessMessage(data.mensaje, '', 'Aceptar');
              }
            }),
            catchError((err) => {
              console.error("Error: ", err);
              this.utilitiesService.showErrorMessage(err.message)
              return of(null)
            }),
            finalize(() => this.spinner.hide() ) // Hiden Spinner
          ).subscribe();
    }
}