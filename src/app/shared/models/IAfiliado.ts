import { ITipoAfiliado } from "./ITipoAfiliado";

export class IAfiliado {
    codigoAfiliado: string = '';
    estadoAfiliado: string = '';
    nombreAfiliado: string = '';
    tipoAfiliadoFk: ITipoAfiliado = new ITipoAfiliado();
}