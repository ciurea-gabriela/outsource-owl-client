import {Category} from './category.interface';
import {Purchase} from './purchase.interface';
import {UserAccount} from './user-account.interface';

export interface Job {
    id?: number;
    name: string;
    price: number;
    daysUntilDelivery?: number;
    rating?: number;
    description?: string;
    previewImage: string;
    category?: Category;
    seller?: UserAccount;
    purchases?: Array<Purchase>;
}
