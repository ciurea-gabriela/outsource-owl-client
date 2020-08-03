import {Component, OnInit} from '@angular/core';
import {JobReq} from '../model/job-req.interface';
import {JobService} from '../core/services/job.service';
import {Job} from '../model/job.interface';

@Component({
    selector: 'app-home-screen',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    jobReq: JobReq = {
        distinct: 'true',
        page: '0',
        sort: 'rating,desc',
        size: '5'
    };
    jobs: Array<Job>;

    constructor(private jobService: JobService) {
    }

    ngOnInit(): void {
        this.getAllJobs();
    }

    getAllJobs() {
        this.jobService.getAllJobsWithPagination(this.jobReq).subscribe(jobs => this.jobs = jobs);
    }

}
