import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {InfoComponent} from './components/info/info.component';
import {MaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        HomeComponent,
        InfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
