import {Job} from './job.interface';
import {Purchase} from './purchase.interface';
import {RoleType} from './enums/role-type.enum';

export interface UserAccount {
    id?: number;
    username: string;
    email: string;
    password?: string;
    rating: number;
    balance: number;
    userRole: RoleType;
    jobs?: Array<Job>;
    purchases?: Array<Purchase>;
}
