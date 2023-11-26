import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchViewComponent } from './components/batch-view/batch-view.component';
import { BatchComponent } from './components/batch/batch.component';

const routes: Routes = [
  {path:':location',component:BatchComponent},
  {path:'view/:batchId',component:BatchViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
