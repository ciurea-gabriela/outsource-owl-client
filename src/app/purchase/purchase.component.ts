/* tslint:disable:triple-equals */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Purchase} from '../model/purchase.interface';
import {PurchaseService} from '../core/services/purchase.service';
import {AuthService} from '../core/services/auth.service';
import {UserAccount} from '../model/user-account.interface';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {PurchaseStatus} from '../model/enums/purchase-status.enum';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationStatus} from '../model/enums/confirmation-dialog-status.enum';
import {Observable} from 'rxjs';
import {PurchaseStatusUpdate} from '../model/purchase-status-update.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {RoleType} from '../model/enums/role-type.enum';
import {RatePurchaseComponent} from './components/rate-purchase/rate-purchase.component';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

    @ViewChild(RatePurchaseComponent) ratePurchaseComponent;

    public purchase: Purchase;
    public currentUser: UserAccount;
    public deliverFormControl: FormControl;
    public deliveryErrorMessage = '';
    public isRatingSelectable = false;
    public ratingSectionTitle = '';

    constructor(private purchaseService: PurchaseService,
                private authService: AuthService,
                private router: Router, private route: ActivatedRoute,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        this.route.paramMap.subscribe((params: ParamMap) => {
            const purchaseId = params.get('id');
            this.purchaseService.getPurchaseByUserIdAndPurchaseId(this.currentUser.id, Number(purchaseId)).subscribe(
                (purchase: Purchase) => {
                    this.purchase = purchase;
                    this.refreshUiState();
                });
        });

        this.deliverFormControl = new FormControl('', [
            Validators.required
        ]);
    }

    public goToJobPage(id: number): void {
        this.router.navigate([`jobs/${id}`]);
    }

    public cancelPurchase(): Observable<any> {
        return this.purchaseService.updatePurchaseStatus(this.currentUser.id, this.purchase.id, {status: PurchaseStatus.CANCELED});
    }

    public isPurchaseInProgressOrLate(): boolean {
        return this.purchase?.status == PurchaseStatus.IN_PROGRESS || this.purchase?.status == PurchaseStatus.LATE;
    }

    public isPurchaseDelivered(): boolean {
        return this.purchase?.status == PurchaseStatus.DELIVERED;
    }

    public isPurchaseFinished(): boolean {
        return this.purchase?.status == PurchaseStatus.FINISHED;
    }

    public isUserSeller(): boolean {
        return this.currentUser?.userRole == RoleType.ROLE_SELLER;
    }

    public isUserBuyer(): boolean {
        return this.currentUser?.userRole == RoleType.ROLE_BUYER;
    }

    public submitDelivery(): void {
        if (this.deliverFormControl.invalid) {
            this.deliveryErrorMessage = 'Delivery can\'t be empty';
            return;
        } else {
            const delivery: PurchaseStatusUpdate = {
                delivery: this.deliverFormControl.value,
                status: PurchaseStatus.DELIVERED
            };
            this.purchaseService.updatePurchaseStatus(this.currentUser.id, this.purchase.id, delivery).subscribe(
                () => {
                    this.refreshPurchaseData();
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 400) {
                        this.deliveryErrorMessage = err.error.details;
                    }
                });
        }
    }

    public acceptPurchase(): void {
        this.purchaseService.updatePurchaseStatus(this.currentUser.id, this.purchase.id, {
            status: PurchaseStatus.FINISHED
        }).subscribe(() => this.refreshPurchaseData());
    }

    public openCancelPurchaseDialog(): void {
        if (this.purchase.status == PurchaseStatus.IN_PROGRESS) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                data: 'Are you sure you want to cancel the purchase?'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result == ConfirmationStatus.YES) {
                    this.cancelPurchase().subscribe(() => {
                        this.authService.refreshCurrentUser().then(() => this.refreshPurchaseData());
                    });
                }
            });
        }
    }

    public receiveRating($rating: number): void {
        this.purchaseService.updatePurchaseStatus(this.currentUser.id, this.purchase.id, {
            status: PurchaseStatus.RATED,
            rating: $rating
        }).subscribe(() => this.refreshPurchaseData());
    }

    public getRatingOrDefault(): number {
        if (this.purchase == null || this.purchase.rating == null) {
            return 0;
        }
        return this.purchase.rating;
    }

    private refreshPurchaseData(): void {
        this.purchaseService.getPurchaseByUserIdAndPurchaseId(this.currentUser.id, this.purchase.id).subscribe(
            (purchase: Purchase) => {
                this.purchase = purchase;
                this.refreshUiState();
            });
    }

    private refreshUiState(): void {
        this.ratingSectionTitle = this.getPurchaseSectionTitle();
        this.ratePurchaseComponent?.updateHoveredStars(this.getRatingOrDefault());
        if (this.purchase.status == PurchaseStatus.FINISHED && this.purchase.rating == null) {
            this.isRatingSelectable = true;
        }
    }

    private getPurchaseSectionTitle(): string {
        return this.ratingSectionTitle = this.purchase.rating != null ? 'Rating' : 'Rate your purchase';
    }
}
