import { ICliente } from "./ICliente";
import { IAfiliado } from './IAfiliado';

export class IReserva {
    fechaFinReserva: Date = new Date();
    fechaInicioReserva: Date = new Date();
    costoTotalReserva: number = 0;
    tipoAfiliadoReservaFk: IAfiliado = new IAfiliado();
    clienteReservaFk: ICliente = new ICliente();
}