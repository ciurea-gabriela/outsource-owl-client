import {Component, Inject, OnInit} from '@angular/core';
import {DialogEvent} from '../../../model/enums/dialog-event.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {JobService} from '../../../core/services/job.service';
import {Category} from '../../../model/category.interface';
import {CategoryService} from '../../../core/services/category.service';

@Component({
    selector: 'app-create-job-dialog',
    templateUrl: './create-job-dialog.component.html',
    styleUrls: ['./create-job-dialog.component.scss']
})
export class CreateJobDialogComponent implements OnInit {
    public createJobForm: FormGroup;
    public categories: Array<Category>;
    private submitted = false;
    public errMessage: string = null;
    private userId: number;
    public fileName: any;

    constructor(public dialogRef: MatDialogRef<CreateJobDialogComponent>,
                private formBuilder: FormBuilder,
                private jobService: JobService,
                private categoryService: CategoryService,
                @Inject(MAT_DIALOG_DATA) private data: number) {
        this.userId = data;
    }

    ngOnInit(): void {
        this.createJobForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(10)]],
            price: ['', [Validators.required, Validators.min(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
            previewImage: ['', Validators.required],
            daysUntilDelivery: ['', [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('^[0-9]*$')]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            categoryId: ['', Validators.required]
        });
        this.getAllCategories();
    }

    public getAllCategories(): void {
        this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
    }

    public onSubmit(): void {
        this.submitted = true;
        if (this.createJobForm.invalid) {
            return;
        }
        const image = this.createJobForm.get('previewImage');
        this.createJobForm.removeControl('previewImage');
        this.jobService.createJob(this.createJobForm.value, image.value, this.userId).subscribe(
            () => {
                this.dialogRef.close({event: DialogEvent.SUCCESS});
            },
            (err: HttpErrorResponse) => {
                if (err.status === 400) {
                    this.errMessage = err.error.details;
                }
            });
        this.createJobForm.addControl('previewImage', new FormControl(['', Validators.required]));
    }

    public closeDialog(): void {
        this.dialogRef.close({event: DialogEvent.CLOSE});
    }

    public saveFileName(event): void {
        this.fileName = event.target.files[0].name;
        this.createJobForm.get('previewImage').setValue(event.target.files[0]);
    }
}
