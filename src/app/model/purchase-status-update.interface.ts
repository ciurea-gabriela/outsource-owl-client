import {PurchaseStatus} from './enums/purchase-status.enum';

export interface PurchaseStatusUpdate {
    rating?: number;
    delivery?: string;
    status: PurchaseStatus;
}
