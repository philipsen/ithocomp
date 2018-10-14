import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientConfig } from '../model/client-config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private url = '/api/';

  constructor(
        private http: HttpClient,
    ) { }

    getConfiguration(): Observable<ClientConfig> {
      return this.http.get<ClientConfig>(this.url + 'configuration');
    }
}
