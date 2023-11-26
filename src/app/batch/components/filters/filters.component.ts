import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgeGroup } from '../../models/eligibility-criteria';
import { AgeGroupResponse, BatchService } from '../../data-providers/batch.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { LocationResponse, LocationService } from 'src/app/location/data-providers/location.service';
import { Location } from 'src/app/location/models/location';
import { FilterForm } from '../../models/batch-constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public locations?: Location[]
  public filterForm!: UntypedFormGroup;
  public showError?: boolean;
  public errorMessage?: string;
  public ageGroupsLoading?: boolean = false;
  public locattionsLoading?: boolean = false;
  public ageGroups?: AgeGroup[];
  @Output() filterValueEmitter = new EventEmitter<FilterForm>();
  @Input({ required: true }) classesCount?: number;
  constructor(
    private readonly batchService: BatchService,
    private readonly locationService: LocationService
  ) { }
  public ngOnInit(): void {
    this.prepareForm();
    this.getAgeGroups();
    this.locationList();
  }
  private getAgeGroups(): void {
    this.batchService.getAgeGroups().subscribe((res: AgeGroupResponse) => {
      if (res.success && res.responseData) {
        this.showError = false;
        this.ageGroups = res.responseData

      }
      else {
        this.showError = true;
        this.errorMessage = '';
      }
      this.ageGroupsLoading = false;
    })
  }
  private locationList(): void {
    this.locationService.getLocationList().subscribe({
      next: (res: LocationResponse) => {
        if (res?.success) {
          this.showError = false;
          this.locations = res?.location
        }
        else {
          this.showError = true;
          this.errorMessage = res.message;
        }
        this.locattionsLoading = false;
      }
    });
  }

  private prepareForm(): void {
    this.filterForm = new UntypedFormGroup({
      startDate: new UntypedFormControl(),
      endDate: new UntypedFormControl(),
      location: new UntypedFormControl(),
      ageRange: new UntypedFormControl()
    })
  }
  public filterValue(): void {
    this.filterValueEmitter.emit(this.filterForm.value);

  }
  public reset(): void {
    this.filterForm.reset()
  }

}
