import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {CurrentUserInfo} from '../model/current-user-info.interface';
import {RoleType} from '../model/enums/role-type.enum';
import {AddBalanceDialogComponent} from '../shared/components/add-balance-dialog/add-balance-dialog.component';
import {ConfirmationStatus} from '../model/enums/confirmation-dialog-status.enum';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public isBuyer: boolean;
    public currentUser?: CurrentUserInfo;

    constructor(private authService: AuthService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authService.refreshCurrentUser().then(() => {
                this.currentUser = JSON.parse(this.authService.getCurrentUser());
                this.isBuyer = this.currentUser.userRole === RoleType.ROLE_BUYER;
            }
        );
    }

    public openAddBalanceDialog(): void {
        const dialogRef = this.dialog.open(AddBalanceDialogComponent, {
            width: '310px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == ConfirmationStatus.YES) {
                this.authService.refreshCurrentUser().then(() => window.location.reload());
            }
        });
    }

}
