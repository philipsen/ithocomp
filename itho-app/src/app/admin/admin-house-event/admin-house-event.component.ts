import { Component, OnInit, Input } from '@angular/core';
import { IthoEvent } from '../../model/itho-event';

const printKeys = ['level', 'room', 'command', 'remote', 'sender'];


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[admin-house-event]',
  templateUrl: './admin-house-event.component.html',
  styleUrls: ['./admin-house-event.component.css']
})


export class AdminHouseEventComponent implements OnInit {

  @Input() event: IthoEvent;

  constructor() { }

  ngOnInit() {
  }

  toString(): string {
    // select the keys in the object that are in the print list
    const keylist = Object.keys(this.event).filter(value => -1 !== printKeys.indexOf(value));
    const str = keylist.map(value => value + ': ' + this.event[value]);
    return str.join(', ');
  }
}
