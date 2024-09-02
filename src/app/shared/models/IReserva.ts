import { ICliente } from "./ICliente";
import { IAfiliado } from './IAfiliado';
import { ITipoAfiliado } from "./ITipoAfiliado";

export class IReserva {
    fechaFinReserva: Date = new Date();
    fechaInicioReserva: Date = new Date();
    costoTotalReserva: number = 0;
    codigoReserva:string | null = '';
    tipoAfiliadoReservaFk: ITipoAfiliado | null = new ITipoAfiliado();
    afiliadoReservaFk: IAfiliado | null = new IAfiliado();
    clienteReservaFk: ICliente = new ICliente();
}