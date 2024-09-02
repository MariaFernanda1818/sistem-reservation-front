import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAfiliado } from '@sharedModule/models/IAfiliado';
import { ICliente } from '@sharedModule/models/ICliente';
import { IReserva } from '@sharedModule/models/IReserva';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { ITipoAfiliado } from '@sharedModule/models/ITipoAfiliado';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { ReservaService } from '@sharedModule/service/reserva.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
    selector: 'app-modify-reservation',
    templateUrl: 'modify-reservation.component.html',
    styleUrl: 'modify-reservation.component.scss'
})

export class ModifyReservationComponent implements OnInit {

    public formModifyReservation: FormGroup = this.formBuilder.group({
        fechaInicioReserva: new FormControl<Date>(new Date(), [Validators.required]),
        fechaFinReserva: new FormControl<Date>(new Date(), [Validators.required])
    });
    public today: string = new Date().toISOString().split('T')[0];
    public minEndDate: Date = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private reservaService: ReservaService,
        public readonly errorHandlerService: ErrorHandlerService,
        @Inject(MAT_DIALOG_DATA) public data: ISafeAny,
        private utilitiesService: UtilitiesService,
        private dialogRef: MatDialogRef<ModifyReservationComponent>,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() { }

    verificarRangoFecha() {
        this.formModifyReservation.get('fechaInicioReserva')?.valueChanges.subscribe((fechaInicio: Date) => {
            this.minEndDate = fechaInicio || this.today;
            // Si se cambia la fecha de inicio, resetea la fecha de fin si es anterior a la nueva fecha mínima
            if (this.formModifyReservation.get('fechaFinReserva')?.value < this.minEndDate) {
              this.formModifyReservation.get('fechaFinReserva')?.reset();
            }
        });
    }

    modificarReserva({valid}:{valid:boolean}) {
        if (!valid) {
            this.formModifyReservation.markAllAsTouched();
            return;
        }
        const codigoReserva = this.data.codigoReserva
        const data: IReserva = {
            codigoReserva: codigoReserva,
            fechaInicioReserva: this.formModifyReservation.get('fechaInicioReserva')?.value,
            fechaFinReserva: this.formModifyReservation.get('fechaFinReserva')?.value,
            costoTotalReserva: 0,
            tipoAfiliadoReservaFk: null,
            afiliadoReservaFk:null,
            clienteReservaFk: new ICliente()
        }
        this.reservaService.modificarReserva(data).pipe(
            tap((data) => {
                console.log(data);
              if (data.error) {
                this.utilitiesService.showErrorMessage(data.mensaje, '', 'Aceptar');
              } else {
                this.dialogRef.close(true);
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

}