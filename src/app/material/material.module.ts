import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule
  ]
})
export class MaterialModule { }