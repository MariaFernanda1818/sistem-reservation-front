import { IMunicipality } from './IMunicipality';
export class IDepartment {
    public idDepartment: number = 0;
    public codeDepartment: string = '';
    public nameDepartment: string = '';
    public municipalities: Array<IMunicipality> = [];
}