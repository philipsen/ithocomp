import { Component, OnInit, Input } from '@angular/core';
import { IthoEvent } from '../../model/itho-event';

const printKeys = ['level', 'room', 'command', 'remote'];


@Component({
  selector: '[admin-house-event]',
  templateUrl: './admin-house-event.component.html',
  styleUrls: ['./admin-house-event.component.css']
})


export class AdminHouseEventComponent implements OnInit {

  @Input() event: IthoEvent;

  constructor() { }

  ngOnInit() {
  }

  ts(): string {
    // console.log('event = ', this.event, Object.keys(this.event));
    const keylist = Object.keys(this.event).filter(value => -1 !== printKeys.indexOf(value));
    // console.log('kl = ', keylist);
    const str = keylist.map(value => value + ': ' + this.event[value]);
    return str.join(', ');
  }
}
