import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { ConvertCaseModule } from '../../pipes/convert-case/convert-case.module';
import { CartComponent } from './cart.component';
import { CartFormComponent } from './cart-form/cart-form.component';
import { CartProductComponent } from './cart-product/cart-product.component';



@NgModule({
  declarations: [
    CartComponent,
    CartFormComponent,
    CartProductComponent
  ],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    ConvertCaseModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiErrorModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiCurrencyPipeModule
  ]
})
export class CartModule { }
