import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { Router, RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

let hasRouterError = false;

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) { }

  handleError(error: any): void {
    console.error('Error occurred:', error);

    if (error && error.ngNavigationError) {
      hasRouterError = false;
      this.router.navigated = false;
    }

    if (isDevMode()) {
      console.error('Development error details:', error);
    }

    // Optionally, rethrow the error if desired
    throw error;
  }
};

export class PreventErrorRouteReuseStrategy implements RouteReuseStrategy {

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {

  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (hasRouterError) {
      hasRouterError = false;
      return false; // Forces the route to reload on error
    }
    return future.routeConfig === curr.routeConfig;
  }
}

