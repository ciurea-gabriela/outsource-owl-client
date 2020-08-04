import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';
import {MenuComponent} from './components/menu/menu.component';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './components/footer/footer.component';
import {JobCardComponent} from './components/job-card/job-card.component';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import {RegisterUserDialogComponent} from './components/register-user-dialog/register-user-dialog.component';
import {LoginNavbarComponent} from './components/login-navbar/login-navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {PurchaseDialogComponent} from './components/purchase-dialog/purchase-dialog.component';
import {AddBalanceDialogComponent} from './components/add-balance-dialog/add-balance-dialog.component';


@NgModule({
    declarations: [
        LogoComponent,
        MenuComponent,
        FooterComponent,
        JobCardComponent,
        LoginDialogComponent,
        RegisterUserDialogComponent,
        LoginNavbarComponent,
        ConfirmationDialogComponent,
        PurchaseDialogComponent,
        AddBalanceDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        LogoComponent,
        MenuComponent,
        FooterComponent,
        JobCardComponent,
        LoginNavbarComponent,
        RegisterUserDialogComponent,
        LoginDialogComponent,
        ConfirmationDialogComponent
    ],
    entryComponents: [
        LoginDialogComponent,
        RegisterUserDialogComponent,
        ConfirmationDialogComponent
    ]
})
export class SharedModule {

}
