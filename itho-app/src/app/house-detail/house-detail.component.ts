import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousesService } from '../houses.service';
import { House } from '../house';
import { RemoteCommandService } from '../remote-command.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  
  constructor(
    private housesService: HousesService,
    private remoteCommandService: RemoteCommandService,
    private route: ActivatedRoute
  ) { }


  house = new House;

  //public house: House;
  ngOnInit() {
    this.getHouse();
  }
  
  getHouse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.housesService.getHouse(id)
      .subscribe(house => this.house = house);
  }

  sendCommand(room: string, command: string): void {
    console.log('sendCommand');
    this.remoteCommandService.sendCommand(this.house.name, room, command)
      .subscribe();
  }
}
