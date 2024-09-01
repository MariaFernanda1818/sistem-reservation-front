import { Injectable } from '@angular/core';
import { IHeader } from '@sharedModule/models/IHeader';

@Injectable({providedIn: 'root'})
export class HeaderService {

    constructor() { }

    getItemsForNavbar() {
      const DATA_HEADER: Array<IHeader> = [
        // {
        //   label: 'Inicio',
        //   route: 'inicio',
        //   selected: false
        // },
        // {
        //   label: 'Administrar',
        //   route: '',
        //   selected: false
        // },
        {
          label: 'Mis reservas',
          route: '',
          selected: false
        },
        {
          label: 'Buscar reservar',
          route: '',
          selected: false
        },
        {
          label: 'Iniciar sesión',
          route: 'inicio-sesion',
          selected: false
        },
      ];
      return DATA_HEADER;
    }
    
}