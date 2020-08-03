import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CurrentUserInfo} from '../../../model/current-user-info.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AuthService} from '../../../core/services/auth.service';
import {Purchase} from '../../../model/purchase.interface';
import {PurchaseService} from '../../../core/services/purchase.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-purchase-list',
    templateUrl: './purchase-list.component.html',
    styleUrls: ['./purchase-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PurchaseListComponent implements OnInit {

    public currentUser: CurrentUserInfo;
    public displayedColumns: string[] = ['previewImage', 'name', 'creationDate', 'price', 'status'];
    public dataSource: MatTableDataSource<Purchase>;
    public selectedPurchaseId: number;
    public isEmpty: boolean;
    public readonly LOCAL_HOST: string = 'https://outsource-owl-api.herokuapp.com/images/';

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private authService: AuthService,
                private purchaseService: PurchaseService,
                private router: Router) {
    }

    public ngOnInit(): void {
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        this.getAllPurchases();
    }

    public getAllPurchases(): void {
        this.purchaseService.getAllPurchasesByUser(this.currentUser.id).subscribe((purchases: Purchase[]) => {
            this.isEmpty = purchases.length === 0;
            this.dataSource = new MatTableDataSource<Purchase>(purchases);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    public goToPurchase(id: number): void {
        this.router.navigate([`/purchases/${id}`]);
    }

}
