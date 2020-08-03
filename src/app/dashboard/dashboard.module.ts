import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {JobListComponent} from './components/job-list/job-list.component';
import {PurchaseListComponent} from './components/purchase-list/purchase-list.component';
import {CreateJobDialogComponent} from './components/create-job-dialog/create-job-dialog.component';
import {CoreModule} from '../core/core.module';


@NgModule({
    declarations: [
        DashboardComponent,
        JobListComponent,
        PurchaseListComponent,
        CreateJobDialogComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule
    ],
    entryComponents: [
        CreateJobDialogComponent
    ]
})
export class DashboardModule {
}
