import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Category} from '../model/category.interface';
import {CategoryService} from '../core/services/category.service';
import {JobReq} from '../model/job-req.interface';
import {JobService} from '../core/services/job.service';
import {Job} from '../model/job.interface';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public category?: Category;
    public categoryId?: string;
    private jobReq?: JobReq;
    public jobs?: Array<Job>;
    public pages: Array<number> = [];
    public selectedPage = 0;
    private nrOfJobsOnPage = 15;

    constructor(private route: ActivatedRoute,
                private categoryService: CategoryService,
                private jobService: JobService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.categoryId = params.get('id') || '';
            this.selectedPage = 0;
            this.getAllJobsByCategoryId();
            this.pages = [];
            if (this.pages.length === 0) {
                this.jobService.getJobsSize(this.categoryId).subscribe(response => {
                    this.calculateNrOfPages(this.nrOfJobsOnPage, response.size);
                });
            }
        });
    }

    private getAllJobsByCategoryId(): void {
        this.categoryService.getCategory(this.categoryId).subscribe(category => {
            this.category = category;
            this.jobReq = {
                distinct: 'false',
                page: this.selectedPage.toString(),
                size: this.nrOfJobsOnPage.toString(),
                sort: 'rating,desc',
                categoryId: this.categoryId
            };
            this.getAllJobs();
        });
    }

    private getAllJobs(): void {
        this.jobService.getAllJobsWithPagination(this.jobReq).subscribe(jobs => {
            this.jobs = jobs;
        });
    }

    public onPageClick(currentPage): void {
        this.selectedPage = currentPage;
        this.getAllJobsByCategoryId();
    }

    private calculateNrOfPages(sizeOfPage: number, jobsSize: number) {
        if (jobsSize <= sizeOfPage) {
            this.pages.push(0);
        } else {
            const nrOfPages = Math.round(jobsSize / sizeOfPage);
            console.log(nrOfPages);
            for (let i = 0; i < nrOfPages; i++) {
                this.pages.push(i);
            }
        }
    }

    public changeFromFirstPageToLast(operation: string): void {
        const lastPageNumber = this.pages.length - 1;
        const firstPageNumber = 0;
        if (operation === 'lastPage') {
            this.selectedPage = this.pages[lastPageNumber];
            this.getAllJobsByCategoryId();
        } else if (operation === 'firstPage' && this.selectedPage === lastPageNumber) {
            this.selectedPage = firstPageNumber;
            this.getAllJobsByCategoryId();
        }
    }

    public showFirstPageButton(): boolean {
        return this.selectedPage === this.pages.length - 1;
    }
}
