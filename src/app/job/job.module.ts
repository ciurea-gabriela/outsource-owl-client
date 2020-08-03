import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobComponent} from './job.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { JobPreviewComponent } from './components/job-preview/job-preview.component';


@NgModule({
    declarations: [
        JobComponent,
        JobPreviewComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
    ]
})
export class JobModule {
}
