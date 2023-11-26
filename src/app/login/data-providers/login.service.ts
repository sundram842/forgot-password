import { HttpClient, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "";

  constructor(
    private readonly http: HttpClient,
    private translate: TranslateService
  ) {}
  public resetPassword(email: string): Observable<any> {
    const resetData = { email: email };
    const url = `${this.apiUrl}auth/reset-password`;
    return this.http
      .post(url, resetData, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const status = response?.status;
          if (status === HttpStatusCode?.Ok) {
            const data = response?.body?.data;
            return data;
          } else {
            return response?.body?.data;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (environment.useMockApi) {
            return of({ success: true, resetPassword: "" })
          } else {
            return of({ success: false, message: this.translate.instant("GLOBAL?.ERROR_MESSAGE") });
          }
        })
      );
  }

  public verificationCode(otp: number): Observable<any> {
    const otpCode = { otp: otp };
    const url = `${this.apiUrl}auth/verify-otp`;
    return this.http
      .post(url, otpCode, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const status = response?.status;
          if (status === HttpStatusCode?.Ok) {
            const data = response?.body?.data;
            return data;
          } else {
            return response?.body?.data;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (environment.useMockApi) {
            return of({ success: true, resetPassword: "" })
          } else {
            return of({ success: false, message: this.translate.instant("GLOBAL?.ERROR_MESSAGE") });
          }
        })
      );
  }

  public addNewPassword(password:string){
    const newPassword = { password: password };
    const url = `${this.apiUrl}`;
    return this.http
      .post(url, newPassword, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          const status = response?.status;
          if (status === HttpStatusCode?.Ok) {
            const data = response?.body?.data;
            return data;
          } else {
            return response?.body?.data;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (environment.useMockApi) {
            return of({ success: true, resetPassword: "" })
          } else {
            return of({ success: false, message: this.translate.instant("GLOBAL?.ERROR_MESSAGE") });
          }
        })
      );
  }
}
