import { Routes } from '@angular/router';
import { RouterGuard } from './core/guards/router.guard';
// import { AppComponent } from './app.component';

export const APP_ROUTES: Routes = [
    {
        path: 'inicio',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'inicio-sesion',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'registro',
        loadChildren: () => import('./modules/register/register.module').then((m) => m.RegisterModule),
    },
    {
        path: 'reservas',
        loadChildren: () => import('./modules/reservations/reservations.module').then(m => m.ReservationsModule),
    },
    // {
    //     path: '',
    //     component: AppComponent,
    //     pathMatch: 'full',
    // },
    { path: '**', redirectTo: 'inicio-sesion', pathMatch: 'full' },
]