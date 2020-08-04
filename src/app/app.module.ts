import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeModule} from './home/home.module';
import {JwtInterceptor} from './security/jwt-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoryModule} from './category/category.module';
import {PurchaseModule} from './purchase/purchase.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {JobModule} from './job/job.module';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HomeModule,
        CategoryModule,
        PurchaseModule,
        DashboardModule,
        JobModule,
        SharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
