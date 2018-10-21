import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IthoButton } from '../../model/itho-button';
import { HousesService } from '../../houses.service';
import { RemoteCommandService } from '../../remote-command.service';

@Component({
  selector: 'app-itho-button',
  templateUrl: './itho-button.component.html',
  styleUrls: ['./itho-button.component.css']
})
export class IthoButtonComponent implements OnInit {
  @Input() button: IthoButton;
  @Input() house: string;

  constructor(private housesService: HousesService,
    private remoteCommandService: RemoteCommandService) { }

  ngOnInit() {
  }

  sendCommandBytes(remoteId: string, remoteCommand: string): void {
    this.remoteCommandService.sendCommandBytes(this.house, remoteId, remoteCommand).subscribe(() => {
    });
  }

}
