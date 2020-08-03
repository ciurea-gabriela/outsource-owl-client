import {RoleType} from './enums/role-type.enum';

export interface CurrentUserInfo {
    id?: number;
    username: string;
    email?: string;
    rating: string;
    balance: string;
    userRole: RoleType;
}
