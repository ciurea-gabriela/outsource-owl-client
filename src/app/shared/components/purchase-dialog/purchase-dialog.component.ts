import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PurchaseDialogData} from '../../../model/purchase-dialog.data';
import {ConfirmationStatus} from '../../../model/enums/confirmation-dialog-status.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PurchaseService} from '../../../core/services/purchase.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
import {CurrentUserInfo} from '../../../model/current-user-info.interface';

@Component({
    selector: 'app-purchase-dialog',
    templateUrl: './purchase-dialog.component.html',
    styleUrls: ['./purchase-dialog.component.scss']
})
export class PurchaseDialogComponent implements OnInit {

    public price: number;
    public totalPrice: number;
    public balance: number;
    public quantity = 1;
    public orderForm: FormGroup;
    public errorMessage = '';
    public currentUser: CurrentUserInfo;

    constructor(public dialogRef: MatDialogRef<PurchaseDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: PurchaseDialogData,
                private formBuilder: FormBuilder,
                private purchaseService: PurchaseService,
                private authService: AuthService) {
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        this.price = this.data.jobPrice;
        this.balance = Number(this.currentUser.balance);
        this.totalPrice = this.price * this.quantity;
    }

    ngOnInit(): void {
        this.orderForm = this.formBuilder.group({
            requirements: ['', [Validators.required]],
            quantity: ['']
        });
    }

    public updateFinalPrice($event) {
        this.quantity = $event.target.value;
        this.totalPrice = this.price * this.quantity;
    }

    public order(): void {
        if (this.totalPrice > this.balance) {
            this.errorMessage = 'You don\'t have enough money in your balance.';
            return;
        }

        if (this.orderForm.valid) {
            const requestData = {
                description: this.orderForm.get('requirements').value,
                quantity: this.quantity,
                jobId: this.data.jobId,
                customerId: this.currentUser.id
            };
            this.purchaseService.createPurchase(requestData).subscribe(() => {
                    this.dialogRef.close(ConfirmationStatus.YES);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 400) {
                        this.errorMessage = err.error.details;
                    }
                });
        }
    }

    public cancel(): void {
        this.dialogRef.close(ConfirmationStatus.NO);
    }
}
