import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationAdapter, Location } from '../models/location';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { locationList } from 'src/mock-api/location-list';

export interface LocationResponse {
  success: boolean;
  location?: Location[];
  message?: string;
}
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly locationAdapter: LocationAdapter,
    private translate: TranslateService,) { }

  public getLocationList(): Observable<LocationResponse> {
    const url = `${this.apiUrl}location`;
    return this.http
      .get(url, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const status = response?.status;
          if (status === HttpStatusCode?.Ok) {
            const data = response?.body?.data;
            return { success: true, location: data?.map((location: any) => this.locationAdapter.adapt(location)), };
          } else {
            return { success: true, location: [] };
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (environment.useMockApi) {
            return of({ success: true, location: locationList.data.map(location => this.locationAdapter.adapt(location)) })
          } else {
            return of({ success: false, message: this.translate.instant("GLOBAL?.ERROR_MESSAGE") });
          }
        })
      );
  }
}
