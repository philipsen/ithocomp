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
  @Output() voted = new EventEmitter<void>();

  constructor(private housesService: HousesService,
    private remoteCommandService: RemoteCommandService) { }

  ngOnInit() {
    // console.log('onInit', this.button);
  }

  sendCommandBytes(remoteId: string, remoteCommand: string): void {
    // console.log('sendCommandBytes', remoteId, remoteCommand);
    this.remoteCommandService.sendCommandBytes(this.house, remoteId, remoteCommand).subscribe(() => {
      this.voted.emit();
    });
  }

  // getState(): void {
  //   console.log('get state', this.house);
  //   this.housesService.getHouseStatus(this.house).subscribe(state => {
  //     console.log('here', state);
  //     // this.state = state;
  //   }
  //   );
  // }
}
