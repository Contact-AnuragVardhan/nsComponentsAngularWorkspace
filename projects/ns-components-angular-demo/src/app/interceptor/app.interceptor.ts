import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GlobalContextService } from '../service/global-context.service';
import { inject } from '@angular/core';

export const appInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const contextService = inject(GlobalContextService);
  let activeAjaxCalls = 0;

  const clonedReq = req.clone({ withCredentials: true });

  // Helper function to manage spinner state
  const handleCalls = (isRequest: boolean): void => {
    isRequest ? ++activeAjaxCalls : --activeAjaxCalls;
    if (activeAjaxCalls === 0) {
      contextService.loadingComponent.hide();
    } else {
      contextService.loadingComponent.show();
    }
  };

  handleCalls(true);
  return next(clonedReq).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        handleCalls(false);
        if (event.body && event.body['STATUS'] === 'FAILURE') {
          //PopUpComponent.showFailureAlertPopup(event.body['MESSAGE']);
          throw throwError(() => new Error(event.body['MESSAGE']));
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      handleCalls(false);
      return throwError(() => error);
    })
  );
};

