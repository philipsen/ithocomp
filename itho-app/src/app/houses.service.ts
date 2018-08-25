import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { House } from './house';
import { Observable, of, pipe } from 'rxjs';
import { IthoEvent } from './model/itho-event';
//import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  private url = '/api/';

  constructor(
    private http: HttpClient,
  ) { }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.url + 'houses');
      // .pipe(
      //   tap(houses -> this.log('fetch houses')),
      //   catchError(this.handleError('getHouses', []))
      // );
  }

  getHouse(id: string): Observable<House> {
    var url = this.url + 'house/' + id;
    return this.http.get<House>(url);
  }

  getHouseEvents(id: string): Observable<IthoEvent[]> {
    var url = this.url + 'house/events/' + id;
    return this.http.get<IthoEvent[]>(url);
  }

  deleteHouse(house: House): Observable<any>  {
    const id = house.name;
    
    var url = this.url + 'house/' + id;
    //return this.http.delete<House>(url, httpOptions).pipe(
    //  tap(_ => this.log(`deleted hero id=${id}`)),
    //  catchError(this.handleError<House>('deleteHouse'))
    //);
    return this.http.delete<House>(url);
  }


}
