import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationStatus} from "../../../model/enums/confirmation-dialog-status.enum";

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {

    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>,
                @Inject(MAT_DIALOG_DATA) public question: String) {
    }

    public confirmAction() {
        this.dialogRef.close(ConfirmationStatus.YES);
    }

    public denyAction() {
        this.dialogRef.close(ConfirmationStatus.NO);
    }
}
