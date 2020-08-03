import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserAccountService} from "../../../core/services/user-account.service";
import {AuthService} from "../../../core/services/auth.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {ConfirmationStatus} from "../../../model/enums/confirmation-dialog-status.enum";

@Component({
    selector: 'app-add-balance-dialog',
    templateUrl: './add-balance-dialog.component.html',
    styleUrls: ['./add-balance-dialog.component.scss']
})
export class AddBalanceDialogComponent implements OnInit {

    public balanceForm: FormGroup;
    public errorMessage = '';

    constructor(public dialogRef: MatDialogRef<AddBalanceDialogComponent>,
                private formBuilder: FormBuilder,
                private userAccountService: UserAccountService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.balanceForm = this.formBuilder.group({
            balance: [1]
        });
    }

    public addBalance(): void {
        if (this.balanceForm.valid) {
            const currentUserId = JSON.parse(this.authService.getCurrentUser()).id;
            this.userAccountService.addUserBalance(currentUserId, this.balanceForm.get('balance').value)
                .subscribe((response: HttpResponse<any>) => {
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
