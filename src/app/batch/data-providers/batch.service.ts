import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Batch, BatchAdapter } from '../models/batch';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AgeGroup, AgeGroupAdapter } from '../models/eligibility-criteria';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { FilterForm } from '../models/batch-constants';
import { batchDeatils } from 'src/mock-api/batch-details';

export interface BatchListResponse {
  success: boolean;
  responseData?: Batch[];
  message?: string;
}
export interface AgeGroupResponse {
  success: boolean;
  responseData?: AgeGroup[];
  message?: string;
}
export interface BatchResponse {
  success: boolean;
  batch?: Batch;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  private apiUrl: string = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly batchAdapter: BatchAdapter,
    private readonly ageGroupAdapter: AgeGroupAdapter,
    private readonly translate: TranslateService,
  ) { }

  public getBatchList(locationId?: number, filters?: FilterForm): Observable<BatchListResponse> {
    const url: string = `${this.apiUrl}batches`;
    const headers = new HttpHeaders().append('locationId', `${locationId}`);
    let params = new HttpParams();
    if (filters?.startDate) {
      params = params.append('dateFrom', `${filters.startDate}`);
    }
    if (filters?.endDate) {
      params = params.append('dateTo', `${filters.endDate}`);
    }
    if (filters?.ageRange) {
      params = params.append('ageGroup', `${filters.ageRange}`);
    }
    return this.http.get(url, { observe: 'response', headers: headers, params: params }).pipe(
      map((response: HttpResponse<any>) => {
        const status = response?.status;
        if (status === HttpStatusCode?.Ok) {
          const data = response?.body?.data;
          return { success: true, responseData: data.map((batch: any) => this.batchAdapter.adapt(batch)), };
        } else {
          return { success: true, message: this.translate.instant('BATCH.NO_BATCHES_FOUND'), };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return of({ success: false, message: this.translate.instant('GLOBAL.ERROR'), });
      })
    );
  }

  public getAgeGroups(): Observable<AgeGroupResponse> {
    const url: string = `${this.apiUrl}lookup/age-groups`;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const status = response?.status;
        if (status === HttpStatusCode?.Ok) {
          const data = response?.body?.data;
          return { success: true, responseData: data.map((age: any) => this.ageGroupAdapter.adapt(age)), };
        } else {
          return { success: true, responseData: [] };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          success: false,
          message: this.translate.instant('BATCH.ERROR_MESSAGE'),
        });
      })
    );
  }
  public getBatchDetails(batchId: number): Observable<BatchResponse> {
    const url: string = `${this.apiUrl}batches/${batchId}`;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const status = response?.status;
        if (status === HttpStatusCode?.Ok) {
          const data = response?.body?.data;
          return {
            success: true,
            batch: this.batchAdapter.adapt(data),
          };
        } else {
          return { success: true, batch: {} };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (environment.useMockApi) {
          return of({ success: true, batch: this.batchAdapter.adapt(batchDeatils.data) })
        } else {
          return of({
            success: false,
            message: this.translate.instant('GLOBAL.ERROR'),
          });
        }
      })
    );
  }

  public getBatchPlans(batchId: number): Observable<BatchResponse> {
    const url: string = `${this.apiUrl}/batches/${batchId}/plans`;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        const status = response?.status;
        if (status === HttpStatusCode?.Ok) {
          const data = response?.body?.data;
          return {
            success: true,
            offer: this.batchAdapter.adapt(data),
          };
        } else {
          return { success: true, offer: {} };
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (environment.useMockApi) {
          return of({ success: true, batch: this.batchAdapter.adapt(batchDeatils.data) })
        } else {
          return of({
            success: false,
            message: this.translate.instant('BATCH.ERROR_MESSAGE'),
          });
        }
      })
    );
  }
}
