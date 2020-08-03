import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../model/job.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-job-card',
    templateUrl: './job-card.component.html',
    styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
    @Input() jobs: Array<Job>;
    @Input() home = false;
    public readonly LOCAL_HOST: string = 'http://localhost:8080/images/';

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    public goToJob(jobId: number): void {
        this.router.navigate([`/jobs/${jobId}`]);
    }
}
