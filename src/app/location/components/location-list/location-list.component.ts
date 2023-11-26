import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationResponse, LocationService } from '../../data-providers/location.service';
import { Location } from '../../models/location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
  private locationListSub!: Subscription;
  public selectedLocation?: Location;
  public locations?: Location[];
  showError?: boolean;
  errorMessage?: string;
  locationsLoading?: boolean;
  constructor(
    private readonly locationService: LocationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getLocations();
  }

  private getLocations(): void {
    this.locationsLoading = true;
    this.locationListSub = this.locationService.getLocationList().subscribe({
      next: (res: LocationResponse) => {
        if (res?.success) {
          this.showError = false;
          this.locations = res?.location;
          const locationId = localStorage.getItem('locationId');
          if (locationId) {
            this.onLocationChange(parseInt(locationId))
          }
        } else {
          this.showError = true;
          this.errorMessage = res.message;
        }
        this.locationsLoading = false;
      }, error(err) {
        console.log(err);
      },
    });
  }

  onLocationChange(locationId?: number): void {
    this.selectedLocation = this.locations?.find(location => location.id === locationId);
    this.selectedLocation?.setIsSelected(true);
  }

  public isSelected(location: Location): boolean {
    return this.locations?.includes(location) ?? false;
  }

  public proceed() {
    localStorage.setItem('locationId', String(this.selectedLocation?.id));
    localStorage.setItem('slug', this.selectedLocation?.slug ?? '');
    this.router.navigate([`/batches/${this.selectedLocation?.slug}`]);
  }

  public ngOnDestroy() {
    if (this.locationListSub) { this.locationListSub.unsubscribe(); }
  }
}
