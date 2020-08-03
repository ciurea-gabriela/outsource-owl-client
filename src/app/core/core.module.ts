import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RemoveUnderscorePipe} from './pipe/remove-underscore.pipe';


@NgModule({
    declarations: [RemoveUnderscorePipe],
    imports: [
        CommonModule
    ],
    exports: [
        RemoveUnderscorePipe
    ]
})
export class CoreModule {
}
