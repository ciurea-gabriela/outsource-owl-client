import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PurchaseComponent } from './purchase.component';
import {CoreModule} from '../core/core.module';
import { RatePurchaseComponent } from './components/rate-purchase/rate-purchase.component';
import { StarComponent } from './components/star/star.component';


@NgModule({
    declarations: [
        PurchaseComponent,
        RatePurchaseComponent,
        StarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        CoreModule
    ]
})
export class PurchaseModule {
}
