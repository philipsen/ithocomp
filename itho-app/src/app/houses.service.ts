import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { House } from './house';
import { Observable } from 'rxjs';
import { IthoEvent } from './model/itho-event';
import { IthoState } from './model/itho-state';
import { IthoButton } from './model/itho-button';

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

    houseEnableLog(name: string): any {
        return this.http.put<any>(this.url + 'house/logging/' + name + '/' + true, true);
    }

    getHouses(): Observable<House[]> {
        return this.http.get<House[]>(this.url + 'houses');
    }

    getHouse(id: string): Observable<House> {
        const url = this.url + 'house/' + id;
        return this.http.get<House>(url);
    }

    getHouseEvents(id: string): Observable<IthoEvent[]> {
        const url = this.url + 'house/events/' + id;
        return this.http.get<IthoEvent[]>(url);
    }

    getHouseStatus(id: string): Observable<IthoState> {
        const url = this.url + 'house/status/' + id;
        return this.http.get<IthoState>(url);
    }

    deleteHouse(house: House): Observable<any> {
        const id = house.name;
        const url = this.url + 'house/' + id;
        // return this.http.delete<House>(url, httpOptions).pipe(
        //  tap(_ => this.log(`deleted hero id=${id}`)),
        //  catchError(this.handleError<House>('deleteHouse'))
        // );
        return this.http.delete<House>(url);
    }

    getButtons(id: String): IthoButton[] {
        const buttons: IthoButton[] = [
            new IthoButton('Eco',               '52:50:b9', '22:f8:3:0:1:2'),
            new IthoButton('Comfort',           '52:50:b9', '22:f8:3:0:2:2'),
            new IthoButton('Keuken 30 min',     '52:50:b9', '22:f3:5:0:2:1e:2:3'),
            new IthoButton('Keuken 60 min',     '52:50:b9', '22:f3:5:0:2:3c:2:3'),
            new IthoButton('WC beneden 10 min', '52:50:b9', '22:f8:3:0:2:2'),
            new IthoButton('WC beneden 20 min', '52:50:b9', '22:f8:3:0:2:2'),
        ];
        console.log('getButtons: ', id, buttons);
        return buttons;
    }

}
