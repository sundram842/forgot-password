import { Component, Input } from '@angular/core';
import { BatchListResponse, BatchService } from '../../data-providers/batch.service';
import { Subscription } from 'rxjs';
import { Batch } from '../../models/batch';
import { CompareOperator } from '../../models/batch-constants';

@Component({
  selector: 'app-batch-card',
  templateUrl: './batch-card.component.html',
  styleUrls: ['./batch-card.component.scss']
})
export class BatchCardComponent {
  public batches?: Batch[];
  public compareOperator = CompareOperator;
  public showError?: boolean;
  public errorMessage?: string;
  public batchesLoading?: boolean = false;
  @Input({ required: true }) batchList?: Batch[];

  constructor() { }
  ngOnInit() {
    this.batches = this.batchList;
  }
}
