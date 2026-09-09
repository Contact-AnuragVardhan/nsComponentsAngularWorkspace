import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './interceptor/app.interceptor';
import { SharedModule } from './modules/shared.module';
import { GlobalErrorHandlerService, PreventErrorRouteReuseStrategy } from './service/global-error-handler.service';

export const appConfig: ApplicationConfig = {
    providers: [provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    importProvidersFrom(SharedModule),
    provideHttpClient(withInterceptors([appInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: RouteReuseStrategy, useClass: PreventErrorRouteReuseStrategy }
  ],
};
