import { Routes } from "@angular/router";
import { CreateReservationComponent } from "./create-reservation/create-reservation.component";

export const RESERVATIONS_ROUTES: Routes = [
    {
        path: 'crear',
        component: CreateReservationComponent
    }
]