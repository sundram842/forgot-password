import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterForm, SelectedView } from '../../models/batch-constants';
import { DatePipe } from '@angular/common';
import { Location } from 'src/app/location/models/location';
import { BatchListResponse, BatchService } from '../../data-providers/batch.service';
import { Batch } from '../../models/batch';
import { ScreenSize, ScreenSizeService } from 'src/app/global/services/screen-size/screen-size.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {

  public view: typeof SelectedView = SelectedView;
  public selectedView: string = SelectedView.LIST;
  public classesCount?: number;
  public receivedFormValue?: FilterForm;
  public showError?: boolean;
  public errorMessage?: string;
  public batchesLoading?: boolean;
  public batchList?: Batch[];
  constructor(
    private readonly router: Router,
    private readonly datePipe: DatePipe,
    private batchService: BatchService,
    private route: ActivatedRoute,
    private screenSizeService: ScreenSizeService
  ) { }
  ngOnInit(): void {
    const locationId = localStorage.getItem('locationId');
    if (locationId) {
      this.getBatchesList(parseInt(locationId));
    } else{
      this.router.navigateByUrl('/locations');
    }

    this.getScreenSize();
  }

  getScreenSize(): void {
    this.screenSizeService.handleObservable().subscribe(response => {
      const size: ScreenSize = response;
      this.setView(size);
    })
  }

  setView(size: ScreenSize): void {
    this.route.queryParams.subscribe(response => {
      if (response && response.view) {
        if (size === ScreenSize.mobile && response.view !== SelectedView.GRID) {
          this.router.navigate([], { queryParams: { view: SelectedView.GRID }, replaceUrl: true });
          this.selectedView = SelectedView.GRID;
        } else {
          this.selectedView = response.view;
        }
      } else {
        if (size === ScreenSize.mobile) {
          this.router.navigate([], { queryParams: { view: SelectedView.GRID }, replaceUrl: true });
          this.selectedView = SelectedView.GRID;
        } else {
          this.router.navigate([], { queryParams: { view: SelectedView.LIST }, replaceUrl: true });
          this.selectedView = SelectedView.LIST;
        }
      }
    })
  }

  private getBatchesList(id?: number, filters?: FilterForm): void {
    this.batchesLoading = true;
    this.batchService
      .getBatchList(id, filters)
      .subscribe((res: BatchListResponse) => {
        if (res.success && res.responseData) {
          this.showError = false;
          this.batchList = res.responseData;
          this.classesCount = res.responseData.length;
        } else {
          this.showError = true;
          this.errorMessage = res.message;
          this.batchList = [];
          this.classesCount = 0;
        }
        this.batchesLoading = false;
      });
  }

  public onToggleChange(selectedView: string): void {
    this.selectedView = selectedView;
    this.router.navigate([], {
      queryParams: { view: selectedView },
      replaceUrl: true,
    });
  }

  public filtersValue(formValue: FilterForm): void {
    this.receivedFormValue = formValue;
    const formattedStartDate = this.datePipe.transform(
      formValue.startDate,
      'yyyy-MM-dd'
    );
    const formattedEndDate = this.datePipe.transform(
      formValue.endDate,
      'yyyy-MM-dd'
    );
    this.router.navigate([], {
      queryParams: {
        view: this.selectedView,
        date_from: formattedStartDate,
        date_to: formattedEndDate,
        ages: formValue?.ageRange?.value,
      },
      replaceUrl: true,
    });
    if (formValue) {
      this.getBatchesList(formValue?.location?.id, formValue);
    }
  }

}
