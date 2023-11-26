import { Component } from '@angular/core';
import { Batch } from '../../models/batch';
import { BatchService } from '../../data-providers/batch.service';
import { ActivatedRoute } from '@angular/router';
import { EligibilityCriteria } from '../../models/eligibility-criteria';
import { Eligibility, eligibilityCriteria } from '../../models/batch-constants';

@Component({
  selector: 'app-batch-view',
  templateUrl: './batch-view.component.html',
  styleUrls: ['./batch-view.component.scss'],
})
export class BatchViewComponent {
  public batchId?: number;
  public eligibility: typeof Eligibility = Eligibility;
  public eligibilityCriteria: EligibilityCriteria[] = eligibilityCriteria;
  public batch?: Batch;
  public showError?: boolean;
  public errorMessage?: string;
  public batchLoading?: boolean;
  constructor(
    private readonly batchService: BatchService,
    private readonly activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.batchId = params['batchId'];
    });
    if (this.batchId) {
      this.getBatchDetails(this.batchId);
    }
  }

  private getBatchDetails(id: number): void {
    this.batchLoading = true;
    this.batchService.getBatchDetails(id).subscribe((res) => {
      if (res.success && res.batch) {
        this.showError = false;
        this.batch = res.batch;
        this.getBatchPlans(id);
      } else {
        this.showError = true;
        this.errorMessage = res.message;
      }
      this.batchLoading = false;
    });
  }

  private getBatchPlans(id: number): void {
    this.batchService.getBatchPlans(id).subscribe((response) => {
      if (response.success && response.batch && response.batch.plans && this.batch?.plans) {
        this.showError = false;
        this.batch = response.batch;
      } else {
        this.showError = true;
        this.errorMessage = response.message;
      }
    });
  }
}
