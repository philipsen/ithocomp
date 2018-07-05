import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { House } from './house';
import { HOUSES } from './mock-houses';
import { Observable, of } from 'rxjs';
//import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HousesService {

  private url = 'http://127.0.0.1/api/';

  getHouses2(): Observable<House[]> {
    return of(HOUSES);
  }

  constructor(
    private http: HttpClient,
  ) { }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.url + 'houses');
    //   .pipe(
    //     tap(houses -> this.log('fetch houses')),
    //     catchError(this.handleError('getHouses', []))
    //   );
  }
}
