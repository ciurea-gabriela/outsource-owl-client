import {RoleType} from './enums/role-type.enum';

export interface SignUp {
    username: string;
    email: string;
    password: string;
    roleType: RoleType;
}
