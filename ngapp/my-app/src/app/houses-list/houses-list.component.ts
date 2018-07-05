import { Component, OnInit } from '@angular/core';
//import { HOUSES } from '../mock-houses';
import { House } from '../house';
import { HousesService } from '../houses.service';


@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.css']
})
export class HousesListComponent implements OnInit {

  houses: House[];

  constructor(private houseService: HousesService) { }

  ngOnInit() {
    this.getHouses();
  }

  getHouses(): void {
    this.houseService.getHouses()
      .subscribe(houses => this.houses = houses);
  }
}
