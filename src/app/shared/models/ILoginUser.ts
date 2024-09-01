import { Role } from "@sharedModule/enums/Role.enum";

export class ILoginUser {
    public emailUser: string = '';
    public password: string = '';
    public role: Role = Role.USER;
}