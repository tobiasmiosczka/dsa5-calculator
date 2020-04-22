import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { PercentagePipe } from './percentage.pipe';
import { ProbeCalcComponent } from './probe-calc/probe-calc.component';
import { RangeFightCalcComponent } from './range-fight-calc/range-fight-calc.component';
import { BackgroundComponent } from './background/background.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    PercentagePipe,
    ProbeCalcComponent,
    RangeFightCalcComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }