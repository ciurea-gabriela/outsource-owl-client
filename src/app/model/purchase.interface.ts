import {Job} from './job.interface';
import {UserAccount} from './user-account.interface';
import {PurchaseStatus} from './enums/purchase-status.enum';

export interface Purchase {
    id?: number;
    quantity: number;
    price?: number;
    creationDate: number;
    deliveryDate?: Date;
    description: string;
    rating?: number;
    delivery?: string;
    status?: PurchaseStatus;
    job: Job;
    customer: UserAccount;
}
