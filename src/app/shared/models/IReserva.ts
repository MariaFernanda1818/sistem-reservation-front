import { ICliente } from "./ICliente";
import { IEstado } from "./IEstado";
import { ITipo } from "./ITipo";

export class IReserva {
    codigoReserva: string = '';
    fechaFinReserva: Date = new Date();
    fechaCreacionReserva: Date = new Date();
    fechaInicioReserva: Date = new Date();
    costoTotalReserva: number = 0;
    estadoReservaFk: IEstado = new IEstado();
    tipoReservaFk: ITipo = new ITipo();
    clienteReservaFk: ICliente = new ICliente();
}