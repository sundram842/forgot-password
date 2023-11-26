import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,HttpClientModule,
    MatButtonToggleModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,HttpClientModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
