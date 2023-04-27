import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConvertCasePipe } from './convert-case.pipe';


@NgModule({
    declarations: [
        ConvertCasePipe
    ],
    exports: [
        ConvertCasePipe
    ],
    imports: [
        CommonModule
    ]
})
export class ConvertCaseModule {}
