import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './global/services/language-service/language.service';
import { AuthInterceptor } from './global/interceptors/auth.interceptor';
import { NotFoundComponent } from './global/components/not-found/not-found.component';
import { ServerErrorInterceptor } from './global/interceptors/server-error.interceptor';
import { VersionCheckService } from './global/services/version-check/version-check.service'
import { LayoutComponent } from './layout/layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [LanguageService], //some service handling global settings
      useFactory: (LanguageService: LanguageService) => LanguageService.getLanguage() //returns locale string
    },
    LanguageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    VersionCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
