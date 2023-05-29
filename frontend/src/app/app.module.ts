import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { MainModule } from '../modules/main/main.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    MainModule,
    HttpClientModule,
    TuiAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
