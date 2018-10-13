import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousesService } from '../houses.service';
import { House } from '../house';
import { RemoteCommandService } from '../remote-command.service';
import { IthoState } from '../model/itho-state';
import { IthoButton } from '../model/itho-button';

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
    buttons: IthoButton[];

    ngOnInit() {
        this.getHouse();
        this.getButtons();
    }

    getHouse(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.housesService.getHouse(id)
            .subscribe(house => this.house = house);
    }

    getButtons(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.buttons = this.housesService.getButtons(id);
    }

    sendCommand(room: string, command: string): void {
        console.log('sendCommand');
        this.remoteCommandService.sendCommand(this.house.name, room, command)
            .subscribe(() => { });
    }
}
