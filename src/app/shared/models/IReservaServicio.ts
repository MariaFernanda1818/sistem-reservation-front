import { IReserva } from "./IReserva";
import { IReservaServicioId } from "./IReservaServicioId";
import { IServicio } from "./IServicio";

export class IReservaServicio {
    reservaServicioId: IReservaServicioId = new IReservaServicioId();
    reservaFk: IReserva = new IReserva();
    servicioFk: IServicio = new IServicio();
}