import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {UserAccountService} from '../../../core/services/user-account.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-register-user-dialog',
    templateUrl: './register-user-dialog.component.html',
    styleUrls: ['./register-user-dialog.component.scss']
})
export class RegisterUserDialogComponent implements OnInit {
    public registerForm: FormGroup;
    public hide = true;
    private submitted = false;
    public errMessage: string = null;

    constructor(public dialogRef: MatDialogRef<RegisterUserDialogComponent>,
                private formBuilder: FormBuilder,
                private userAccountService: UserAccountService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(150)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
            roleType: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.userAccountService.registerUser(this.registerForm.value).subscribe(
            () => {
                this.dialogRef.close({event: DialogEvent.SUCCESS});
            },
            (err: HttpErrorResponse) => {
                if (err.status === 400) {
                    this.errMessage = err.error.details;
                }
            });
    }

    public closeDialog(): void {
        this.dialogRef.close({event: DialogEvent.CLOSE});
    }

}
