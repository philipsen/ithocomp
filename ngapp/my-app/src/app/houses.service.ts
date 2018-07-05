import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

import { House } from './house';
import { HOUSES } from './mock-houses';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
//import { catchError } from 'rxjs/operators';

@Injectable()
export class HousesService {

  private url = 'api/';

  getHouses(): Observable<House[]> {
    return of(HOUSES);
  }

  constructor(
    //private http: HttpClient,
  ) { }

  // getHouses2(): Observable<House[]> {
  //   return this.http.get<House[]>(this.url + 'houses');
  //   //   .pipe(
  //   //     tap(houses -> this.log('fetch houses')),
  //   //     catchError(this.handleError('getHouses', []))
  //   //   );
  // }
}
