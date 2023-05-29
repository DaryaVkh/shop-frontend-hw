import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiBadgedContentModule } from '@taiga-ui/kit';
import { CartModule } from '../cart/cart.module';
import { ProductListModule } from '../product-list/product-list.module';
import { MainComponent } from './main.component';



@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    ProductListModule,
    TuiBadgedContentModule,
    CartModule
  ]
})
export class MainModule { }
