import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryComponent} from './category.component';
import {LoginDialogComponent} from '../shared/components/login-dialog/login-dialog.component';
import {RegisterUserDialogComponent} from '../shared/components/register-user-dialog/register-user-dialog.component';


@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    exports: [
        CategoryComponent
    ],
    entryComponents: [
        LoginDialogComponent,
        RegisterUserDialogComponent
    ]
})
export class CategoryModule {
}
