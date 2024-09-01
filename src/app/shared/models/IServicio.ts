import { ITipo } from "./ITipo";

export class IServicio {
    codigoServicio: string = '';
    nombreServicio: number = 0;
    costoServicio: number = 0;
    tipoServicioFk: ITipo = new ITipo();
}