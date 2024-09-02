import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAfiliado } from '@sharedModule/models/IAfiliado';
import { ICliente } from '@sharedModule/models/ICliente';
import { IReserva } from '@sharedModule/models/IReserva';
import { IResponseAfiliadoServicio } from '@sharedModule/models/IResponseAfiliadoServicio';
import { ITipoAfiliado } from '@sharedModule/models/ITipoAfiliado';
import { Base64Service } from '@sharedModule/service/base64.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { SubjectService } from '@sharedModule/service/subject.service';
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
    public listAfiliadoServicio: Array<IResponseAfiliadoServicio> = new Array();
    public establecimientoSeleccionado: IResponseAfiliadoServicio = new IResponseAfiliadoServicio();
    public posicionSeleccionada!: number;
    public today: string = new Date().toISOString().split('T')[0];
    public minEndDate: Date = new Date();
    private tipoAfiliado: number = 2;

    constructor(
        private formBuilder: FormBuilder,
        private reservaService:ReservaService,
        public readonly errorHandlerService: ErrorHandlerService,
        private utilitiesService: UtilitiesService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.buscarAfiliadosTipo()
        this.verificarRangoFecha();
    }

    private buscarAfiliadosTipo(){
        this.spinner.show(); // Show Spinner
        this.reservaService.queryAllAfiliadosTipoAfiliados(this.tipoAfiliado).pipe(
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

    seleccionarEstablecimiento(afiliado: IResponseAfiliadoServicio, idx: number) {
        this.establecimientoSeleccionado = afiliado;
        this.posicionSeleccionada = idx;
    }

    buscarAfiliados(){

        console.log("Se busco");
        if(this.formCreateReservation.get('tipoReserva')?.value == 'restaurantes'){
            this.tipoAfiliado = 2
        }else if(this.formCreateReservation.get('tipoReserva')?.value == 'hoteles'){
            this.tipoAfiliado = 1
        }
        this.buscarAfiliadosTipo()
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
        const { codigoAfiliado } = this.establecimientoSeleccionado;
        if (!codigoAfiliado) {
            this.utilitiesService.showErrorMessage('Debe seleccionar un establecimiento.', '', 'Aceptar');
            return;
        }
        const cliente: ICliente = this.getObjectFromSessionStorage<ICliente>('cliente') || new ICliente();
        const SEND_DATA: IReserva = {
            fechaFinReserva: this.formCreateReservation.get("fechaFinReserva")?.value,
            fechaInicioReserva: this.formCreateReservation.get("fechaInicioReserva")?.value,
            costoTotalReserva: 0,
            codigoReserva: null,
            tipoAfiliadoReservaFk: {
                idTipoAfiliado: this.tipoAfiliado,
                nombreTipoAfiliado: this.formCreateReservation.get('tipoReserva')?.value.toUpperCase()
            },
            afiliadoReservaFk: {
                codigoAfiliado: this.establecimientoSeleccionado.codigoAfiliado,
                estadoAfiliado: '',
                nombreAfiliado: '',
                tipoAfiliadoFk: {
                    idTipoAfiliado: this.tipoAfiliado,
                    nombreTipoAfiliado: this.formCreateReservation.get('tipoReserva')?.value.toUpperCase()
                }
            },
            clienteReservaFk: cliente
        }     
        
        this.reservaService.createReservation(SEND_DATA).pipe(
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

        // Logica implementar servicio
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

}