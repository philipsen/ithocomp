import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../house';
import { HousesService } from '../../houses.service';

@Component({
  selector: 'admin-house-item',
  templateUrl: './admin-house-item.component.html',
  styleUrls: ['./admin-house-item.component.css']
})
export class AdminHouseItemComponent implements OnInit {

  @Input()  house: House;

  constructor(private houseService: HousesService) { }

  ngOnInit() {
  }

  delete(house: House): void {
    console.log(`delete house ${house.name}`);
    this.houseService.deleteHouse(house).subscribe();
  }

}
