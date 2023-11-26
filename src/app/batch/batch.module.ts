import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { SharedModule } from '../shared/shared.module';
import { WeekRecurrenceComponent } from './components/week-recurrence/week-recurrence.component';
import { BatchCardComponent } from './components/batch-card/batch-card.component';
import { FiltersComponent } from './components/filters/filters.component';
import { BatchViewComponent } from './components/batch-view/batch-view.component';
import { BatchComponent } from './components/batch/batch.component';


@NgModule({
  declarations: [
    BatchListComponent,
    WeekRecurrenceComponent,
    FiltersComponent,
    BatchViewComponent,
    BatchCardComponent,
    BatchComponent,
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule
  ],
  providers:[DatePipe]
})
export class BatchModule { }
