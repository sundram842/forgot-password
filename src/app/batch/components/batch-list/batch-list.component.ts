import { Component, Input } from '@angular/core';
import {
  BatchListResponse,
  BatchService,
} from '../../data-providers/batch.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  Eligibility,
  eligibilityCriteria,
} from '../../models/batch-constants';
import { EligibilityCriteria } from '../../models/eligibility-criteria';
import { Batch } from '../../models/batch';
@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss'],
})
export class BatchListComponent {

  public eligibility: typeof Eligibility = Eligibility;
  public eligibilityCriteria: EligibilityCriteria[] = eligibilityCriteria;
  public locationId?: number;
  public displayedColumns: string[] = [
    'class',
    'for',
    'start',
    'when',
    'where',
    'with',
    'fee',
  ];
  public dataSource = new MatTableDataSource();
  @Input({ required: true }) batchList?: Batch[];

  constructor(
    private readonly batchService: BatchService,
  ) { }
  public ngOnInit(): void {
    if (this.batchList)
      this.dataSource.data = this.batchList;
  }

}
