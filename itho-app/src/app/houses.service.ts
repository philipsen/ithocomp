import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { House } from './house';
import { Observable } from 'rxjs';
import { IthoEvent } from './model/itho-event';
import { IthoState } from './model/itho-state';
import { IthoButton } from './model/itho-button';
import { Wmt40Buttons, Wmt6Buttons } from './houses.hardcodedbuttons';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class HousesService {
    private url = 'http://localhost:5000/api/';


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
        return this.http.delete<House>(url);
    }

    getButtons(id: String): IthoButton[] {
        let b = Wmt6Buttons;
        switch (id) {
            case 'wmt40':
                b = Wmt40Buttons;
        }
        console.log('getButtons', id, b);
        return b;
    }
}
