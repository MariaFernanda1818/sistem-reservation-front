import { ISafeAny } from "./ISafeAny";

export class IResponse {
    public error: boolean = false;
    public mensaje: string = '';
    public status_code: number = 0; 
    public status:string = '';
    public data: ISafeAny;
}