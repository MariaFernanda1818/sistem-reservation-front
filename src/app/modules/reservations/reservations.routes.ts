import { Routes } from "@angular/router";
import { CreateReservationComponent } from "./create-reservation/create-reservation.component";
import { UserReservationComponent } from './user-reservation/user-reservation.component';

export const RESERVATIONS_ROUTES: Routes = [
    {
        path: 'crear',
        component: CreateReservationComponent
    },
    {
        path: 'reservas',
        component: UserReservationComponent
    }
]