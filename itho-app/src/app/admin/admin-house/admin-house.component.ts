import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../house';
import { HousesService } from '../../houses.service';
import { ActivatedRoute } from '@angular/router';
import { IthoEvent } from '../../model/itho-event';

@Component({
  selector: 'app-admin-house',
  templateUrl: './admin-house.component.html',
  styleUrls: ['./admin-house.component.css']
})
export class AdminHouseComponent implements OnInit {

  @Input() house: House;
  events: IthoEvent[];

  constructor(
    private housesService: HousesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getHouse();
    this.getEvents();
  }

  getEvents(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.housesService.getHouseEvents(id).subscribe(events => {
      console.log('events: ', events);
      this.events = events;
    });
  };

  getHouse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.housesService.getHouse(id)
      .subscribe(house => this.house = house);
  }

}
