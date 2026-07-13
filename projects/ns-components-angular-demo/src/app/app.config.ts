import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './interceptor/app.interceptor';
import { SharedModule } from './modules/shared.module';
import { GlobalErrorHandlerService, PreventErrorRouteReuseStrategy } from './service/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    importProvidersFrom(SharedModule),
    provideHttpClient(withInterceptors([appInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: RouteReuseStrategy, useClass: PreventErrorRouteReuseStrategy }
  ]
};
