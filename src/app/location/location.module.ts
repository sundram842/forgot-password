import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocationListComponent } from './components/location-list/location-list.component';


@NgModule({
  declarations: [
    LocationListComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule
  ]
})
export class LocationModule { }
