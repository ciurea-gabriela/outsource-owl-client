import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../../model/purchase.interface';
import {PurchaseStatusUpdate} from '../../model/purchase-status-update.interface';
import {PurchaseCreate} from '../../model/purchase-create.interface';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    private readonly API_URI: string = 'https://outsource-owl-api.herokuapp.com';

    constructor(private http: HttpClient) {
    }

    public getAllPurchasesByUser(id: number): Observable<Purchase[]> {
        return this.http.get<Purchase[]>(this.API_URI + `/users/${id}/purchases`);
    }

    public getPurchaseByUserIdAndPurchaseId(userId: number, purchaseId: number): Observable<Purchase> {
        return this.http.get<Purchase>(this.API_URI + `/users/${userId}/purchases/${purchaseId}`);
    }

    public updatePurchaseStatus(userId: number, purchaseId: number, purchaseStatusUpdate: PurchaseStatusUpdate): Observable<any> {
        return this.http.patch<any>(this.API_URI + `/users/${userId}/purchases/${purchaseId}`, purchaseStatusUpdate);
    }

    public createPurchase(data: PurchaseCreate): Observable<any> {
        return this.http.post<any>(this.API_URI + `/purchases`, data);
    }
}
