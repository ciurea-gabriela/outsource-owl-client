import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {CurrentUserInfo} from '../../../model/current-user-info.interface';
import {Job} from '../../../model/job.interface';
import {JobService} from '../../../core/services/job.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {CreateJobDialogComponent} from '../create-job-dialog/create-job-dialog.component';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {MatDialog} from '@angular/material';
import {SnackBarUtil} from '../../../util/snack-bar-util';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobListComponent implements OnInit {
    public currentUser: CurrentUserInfo;
    public displayedColumns: string[] = ['previewImage', 'name', 'price', 'daysUntilDelivery'];
    public dataSource: MatTableDataSource<Job>;
    public readonly LOCAL_HOST: string = 'https://outsource-owl-api.herokuapp.com/images/';
    public isEmpty: boolean;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private authService: AuthService,
                private jobService: JobService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: SnackBarUtil) {
    }

    public ngOnInit(): void {
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        this.getAllJobs();
    }

    public getAllJobs(): void {
        this.jobService.getAllJobsBySellerId(this.currentUser.id).subscribe((jobs: Job[]) => {
            this.isEmpty = jobs.length === 0;
            this.dataSource = new MatTableDataSource<Job>(jobs);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    public goToJob(id: number) {
        this.router.navigate([`/jobs/${id}`]);
    }

    openCreateJobDialog() {
        const dialogRef = this.dialog.open(CreateJobDialogComponent, {
            width: '400px',
            maxHeight: '700px',
            data: this.currentUser.id
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result?.event === DialogEvent.SUCCESS) {
                this.getAllJobs();
                this.snackBar.openSnackBar('Job Successful created', 'close');
            }
        });
    }
}
