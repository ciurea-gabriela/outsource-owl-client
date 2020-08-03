import {Component, OnInit} from '@angular/core';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {SnackBarUtil} from '../../../util/snack-bar-util';
import {MatDialog} from '@angular/material';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {RegisterUserDialogComponent} from '../register-user-dialog/register-user-dialog.component';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {CurrentUserInfo} from '../../../model/current-user-info.interface';

@Component({
    selector: 'app-login-navbar',
    templateUrl: './login-navbar.component.html',
    styleUrls: ['./login-navbar.component.scss']
})
export class LoginNavbarComponent implements OnInit {
    public isLoggedOut: boolean;
    public currentUser: CurrentUserInfo;

    constructor(private dialog: MatDialog,
                private snackBar: SnackBarUtil,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.isLoggedOut = this.authService.isLoggedOut();
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
    }

    public openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '310px',
            maxHeight: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result?.event === DialogEvent.SUCCESS) {
                this.router.navigate(['dashboard']);
            }
        });
    }

    public openRegisterUserDialog(): void {
        const dialogRef = this.dialog.open(RegisterUserDialogComponent, {
            width: '310px',
            maxHeight: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result?.event === DialogEvent.SUCCESS) {
                this.router.navigate(['dashboard']);
            }
        });
    }

    public logOut(): void {
        this.authService.logout();
        this.isLoggedOut = true;
        this.router.navigate(['home']);
    }

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }
}
