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
    public pages: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    public selectedPage = 0;

    constructor(private route: ActivatedRoute,
                private categoryService: CategoryService,
                private jobService: JobService,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.categoryId = params.get('id') || '';
            this.selectedPage = 0;
            this.getAllJobsByCategoryId();
        });
    }

    private getAllJobsByCategoryId() {
        this.categoryService.getCategory(this.categoryId).subscribe(category => {
            this.category = category;
            this.jobReq = {
                distinct: 'false',
                page: this.selectedPage.toString(),
                size: '18',
                sort: 'rating,desc',
                categoryId: this.categoryId
            };
            this.getAllJobs();
        });
    }

    private getAllJobs(): void {
        this.jobService.getAllJobsWithPagination(this.jobReq).subscribe(jobs => this.jobs = jobs);
    }

    public onPageClick(currentPage): void {
        this.selectedPage = currentPage;
        this.getAllJobsByCategoryId();
    }

    public changePageNumbers(operation: string): void {
        if (operation === 'next') {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i] = this.pages[i] + 9;
                this.changeDetector.detectChanges();
            }
            this.selectedPage = this.pages[0];
            this.getAllJobsByCategoryId();
        } else if (operation === 'previous' && this.selectedPage > 8) {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i] = this.pages[i] - 9;
                this.changeDetector.detectChanges();
            }
            this.selectedPage = this.pages[this.pages.length - 1];
            this.getAllJobsByCategoryId();
        }
    }

    public showPreviousButton(): boolean {
        return this.selectedPage > 8;
    }
}
