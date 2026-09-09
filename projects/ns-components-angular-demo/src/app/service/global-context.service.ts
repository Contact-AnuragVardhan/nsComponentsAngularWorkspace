import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalContextService {

  isLoggedIn: boolean = true;
  isAuthorized: boolean = true;
  loadingComponent!: LoadingSpinnerComponent;

  constructor(private http: HttpClient) { 

  }

  fetchData(method: 'GET' | 'POST', url: string, params?: any, body?: any): Observable<any> {
    let options: { params?: HttpParams; headers?: HttpHeaders; body?: any } = {};

    if (params) {
      options.params = new HttpParams();
      Object.keys(params).forEach(key => {
        options.params = options.params?.append(key, params[key]);
      });
    }

    if (body) {
      options.body = body;
    }

    switch (method) {
      case 'GET':
        return this.http.get(url, options);
      case 'POST':
        return this.http.post(url, options.body, options);
      default:
        throw new Error('Invalid HTTP method');
    }
  }

}
