import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputNumberModule, TuiIslandModule, TuiTagModule } from '@taiga-ui/kit';
import { ConvertCaseModule } from '../../pipes/convert-case/convert-case.module';
import { ProductCardComponent } from './product-card.component';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  exports: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiButtonModule,
    TuiTagModule,
    ConvertCaseModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule
  ]
})
export class ProductCardModule { }
