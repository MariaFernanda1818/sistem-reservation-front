import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from '@core/interceptors/default.interceptor';
import { HttpRequestMockInterceptorService } from '@core/interceptors/http-request-mock-interceptor.service';
import { environment } from '@env/environment';
import { HeaderModule } from './modules/header/header.module';

const INTERCEPTOR_PROVIDES = [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }];

const PROVIDES_DESARROLLO: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestMockInterceptorService, multi: true },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    RouterModule.forRoot(APP_ROUTES),
    NgbModule,
    LayoutModule,
    HeaderModule
    // LayoutConfigDynamicModule.forRoot('assets/configuration.json')
  ],
  providers: [
    provideAnimationsAsync(),
    ...INTERCEPTOR_PROVIDES, 
    DatePipe, 
    !environment.production ? PROVIDES_DESARROLLO : []
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
