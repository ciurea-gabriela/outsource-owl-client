/* tslint:disable:triple-equals */
import {Component, OnInit} from '@angular/core';
import {RoleType} from '../../../model/enums/role-type.enum';
import {Job} from '../../../model/job.interface';
import {UserAccount} from '../../../model/user-account.interface';
import {AuthService} from '../../../core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {JobService} from '../../../core/services/job.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ConfirmationStatus} from '../../../model/enums/confirmation-dialog-status.enum';
import {PurchaseDialogComponent} from '../../../shared/components/purchase-dialog/purchase-dialog.component';
import {LoginDialogComponent} from '../../../shared/components/login-dialog/login-dialog.component';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {AddBalanceDialogComponent} from '../../../shared/components/add-balance-dialog/add-balance-dialog.component';

@Component({
    selector: 'app-job-preview',
    templateUrl: './job-preview.component.html',
    styleUrls: ['./job-preview.component.scss']
})
export class JobPreviewComponent implements OnInit {

    public readonly LOCAL_HOST: string = 'https://outsource-owl-api.herokuapp.com/images/';
    public job: Job;
    public currentUser: UserAccount;
    private wasUserNotLogged = false;

    constructor(private authService: AuthService,
                private jobService: JobService,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        this.route.paramMap.subscribe((params: ParamMap) => {
            const jobId = params.get('id');
            this.jobService.getJobById(Number(jobId)).subscribe((job: Job) => this.job = job);
        });
    }

    public isUserBuyer(): boolean {
        return this.currentUser?.userRole == RoleType.ROLE_BUYER;
    }

    public isUserSeller(): boolean {
        return this.currentUser?.userRole == RoleType.ROLE_SELLER;
    }

    public purchase(): void {
        if (this.isUserBuyer() && this.currentUser.balance >= this.job?.price) {
            this.openPurchaseDialog();
            return;
        }

        if (this.isUserBuyer() && this.currentUser.balance < this.job?.price) {
            this.openAddBalanceDialog();
            return;
        }

        if (!this.isUserBuyer() && !this.isUserSeller()) {
            this.openLoginDialog();
        }
    }

    private openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '310px',
            maxHeight: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result?.event === DialogEvent.SUCCESS) {
                this.authService.refreshCurrentUser().then(() => {
                    this.wasUserNotLogged = true;
                    this.currentUser = JSON.parse(this.authService.getCurrentUser());
                    if (this.currentUser?.balance < this.job?.price) {
                        this.openAddBalanceDialog();
                    } else {
                        this.openPurchaseDialog();
                    }
                });
            }
        });
    }

    private openPurchaseDialog(): void {
        const dialogRef = this.dialog.open(PurchaseDialogComponent, {
            data: {
                jobPrice: this.job?.price,
                jobId: this.job?.id,
            },
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
                if (result == ConfirmationStatus.YES) {
                    this.authService.refreshCurrentUser().then(() => this.router.navigate([`/dashboard`]));
                } else if (result == ConfirmationStatus.NO && this.wasUserNotLogged) {
                    window.location.reload();
                }
            }
        );
    }

    private openAddBalanceDialog(): void {
        const dialogRef = this.dialog.open(AddBalanceDialogComponent, {
            width: '310px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result == ConfirmationStatus.YES) {
                this.authService.refreshCurrentUser().then(() => window.location.reload());
            } else if (result == ConfirmationStatus.NO && this.wasUserNotLogged) {
                window.location.reload();
            }
        });
    }

}
