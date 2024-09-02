import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RESERVATIONS_ROUTES } from './reservations.routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@sharedModule/shared.module';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { AuthService } from '@sharedModule/service/auth.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { UserReservationComponent } from './user-reservation/user-reservation.component';
import { ModifyReservationComponent } from './modify-reservation/modify-reservation.component';
import { ReservaService } from '@sharedModule/service/reserva.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(RESERVATIONS_ROUTES)
    ],
    exports: [],
    declarations: [CreateReservationComponent, UserReservationComponent, ModifyReservationComponent],
    providers: [AuthService, ReservaService, ErrorHandlerService, UtilitiesService],
})
export class ReservationsModule { }
