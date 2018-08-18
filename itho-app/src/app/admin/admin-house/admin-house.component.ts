import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../house';
import { HousesService } from '../../houses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-house',
  templateUrl: './admin-house.component.html',
  styleUrls: ['./admin-house.component.css']
})
export class AdminHouseComponent implements OnInit {

  @Input()  house: House;

  constructor(    
    private housesService: HousesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getHouse();
  }


  getHouse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.housesService.getHouse(id)
      .subscribe(house => this.house = house);
  }

}
