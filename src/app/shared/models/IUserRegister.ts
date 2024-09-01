import { Role } from "@sharedModule/enums/Role.enum";

export class IUserRegister {
    public numberDocumentUser: string = '';
    public emailUser: string = '';
    public passwordUser: string = '';
    public namesUser: string = '';
    public lastNamesUser: string = '';
    public phoneNumber: string = '';
    public role: Role = Role.USER;
}