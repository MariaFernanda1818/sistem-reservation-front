import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RouterGuard } from '../../core/guards/router.guard';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivateChild: [RouterGuard]
    }
]