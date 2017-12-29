import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  constructor(private http: Http, private jwtService: JwtService) { }

  get(path: string, params = new URLSearchParams()): Observable<any> {
    return this.http
            .get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params})
            .map((response: Response) => response.json());
  }

  post(path: string, body = {}): Observable<any> {
    return this.http.post(`${ environment.api_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
                    .map((response: Response) => response.json())
                    .catch(this.formatErrors);
  }

}
