import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
    public loginForm: FormGroup;
    public hide = true;
    public isBadCredentials = false;
    private submitted = false;

    constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
                private formBuilder: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            usernameOrEmail: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]]
        });
    }

    public onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.loginForm.value)
            .then(() => {
                    this.isBadCredentials = false;
                    this.dialogRef.close({event: DialogEvent.SUCCESS});
                }
            )
            .catch(() => {
                this.isBadCredentials = true;
            });
    }

    public closeDialog(): void {
        this.dialogRef.close({event: DialogEvent.CLOSE});
    }
}
