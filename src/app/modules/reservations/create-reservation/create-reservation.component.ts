import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { IAfiliado } from '@sharedModule/models/IAfiliado';
import { IAfiliadoServicio } from '@sharedModule/models/IAfiliadoServicio';
import { ICliente } from '@sharedModule/models/ICliente';
import { IReserva } from '@sharedModule/models/IReserva';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
    selector: 'app-create-reservation',
    templateUrl: 'create-reservation.component.html',
    styleUrl: 'create-reservation.component.scss'
})

export class CreateReservationComponent implements OnInit {

    public formCreateReservation: FormGroup = this.formBuilder.group({
        tipoReserva: new FormControl<string>('restaurantes'),
        fechaInicioReserva: new FormControl<Date>(new Date(), [Validators.required]),
        fechaFinReserva: new FormControl<Date>(new Date(), [Validators.required])
    });
    public listAfiliadoServicio: Array<IAfiliadoServicio> = new Array();
    public establecimientoSeleccionado: IAfiliadoServicio = new IAfiliadoServicio();
    public posicionSeleccionada!: number;
    public today: string = new Date().toISOString().split('T')[0];
    public minEndDate: Date = new Date();
    private tipoAfiliado: number = 1;

    constructor(
        private formBuilder: FormBuilder,
        private reservaService:ReservaService,
        public readonly errorHandlerService: ErrorHandlerService,
        private utilitiesService: UtilitiesService,
        private spinner: NgxSpinnerService
    ) { 
        
    }

    ngOnInit() {
        this.listAfiliadoServicio = [
            new IAfiliadoServicio(),
            new IAfiliadoServicio(),
            new IAfiliadoServicio(),
            new IAfiliadoServicio(),
            new IAfiliadoServicio(),
        ]
        const SEND_DATA: IReserva = {
            fechaFinReserva: new Date(),
            fechaInicioReserva: new Date(),
            costoTotalReserva: 0,
            tipoAfiliadoReservaFk: new IAfiliado(),
            clienteReservaFk: new ICliente()
        }     
        
        this.spinner.show(); // Show Spinner
        this.reservaService.queryAllAfiliadosTipoAfiliados(this.tipoAfiliado).pipe(
            tap((data) => {
              if (data.error) {
                this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar');
              } else {
                this.utilitiesService.showSucessMessage(data.mensaje, 'inicio-sesion', 'Aceptar');
              }
            }),
            catchError((err) => {
              console.error("Error: ", err);
              this.utilitiesService.showErrorMessage(err.message)
              return of(null)
            }),
            finalize(() => this.spinner.hide() ) // Hiden Spinner
          ).subscribe();
   
        console.log(SEND_DATA);
        console.log(this.listAfiliadoServicio);
        this.verificarRangoFecha();
        // this.buildFormCreateReservation();
    }

    private buildFormCreateReservation() {
        this.formCreateReservation = this.formBuilder.group({
            tipoReserva: new FormControl<string>('restaurantes'),
            fechaInicioReserva: new FormControl<Date>(new Date()),
            fechaFinReserva: new FormControl<Date>(new Date()),
            afiliado: new FormControl<IAfiliado>(new IAfiliado()),
            cliente: new FormControl<ICliente>(new ICliente()),
            costoTotal: new FormControl<number>(0)
        });
    }

    seleccionarEstablecimiento(afiliado: IAfiliadoServicio, idx: number) {
        this.establecimientoSeleccionado = afiliado;
        this.posicionSeleccionada = idx;
    }

    aplicarSeleccion() {
        return this.posicionSeleccionada;
    }

    verificarRangoFecha() {
        this.formCreateReservation.get('fechaInicioReserva')?.valueChanges.subscribe((fechaInicio: Date) => {
            this.minEndDate = fechaInicio || this.today;
            // Si se cambia la fecha de inicio, resetea la fecha de fin si es anterior a la nueva fecha mínima
            if (this.formCreateReservation.get('fechaFinReserva')?.value < this.minEndDate) {
              this.formCreateReservation.get('fechaFinReserva')?.reset();
            }
        });
    }

    crearReserva({valid}:{valid:boolean}) {
        if (!valid) {
            this.formCreateReservation.markAllAsTouched();
            return;
        }

        // Logica implementar servicio
    }

}