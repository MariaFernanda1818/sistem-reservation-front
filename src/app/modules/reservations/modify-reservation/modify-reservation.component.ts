import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';

@Component({
    selector: 'app-modify-reservation',
    templateUrl: 'modify-reservation.component.html',
    styleUrl: 'modify-reservation.component.scss'
})

export class ModifyReservationComponent implements OnInit {

    public formModifyReservation: FormGroup = this.formBuilder.group({
        tipoReserva: new FormControl<string>('restaurantes'),
        fechaInicioReserva: new FormControl<Date>(new Date(), [Validators.required]),
        fechaFinReserva: new FormControl<Date>(new Date(), [Validators.required])
    });

    constructor(
        private formBuilder: FormBuilder,
        public readonly errorHandlerService: ErrorHandlerService
    ) { }

    ngOnInit() { }
}