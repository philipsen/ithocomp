import { Component, OnInit, Input } from '@angular/core';
import { IthoEvent } from '../../model/itho-event';

const printKeys = ['level', 'room', 'command'];


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
    var k2 = Object.keys(this.event).filter(value => -1 !== printKeys.indexOf(value));
    var s = k2.map(value => value + ': ' + this.event[value]);
    return s.join(', ');
  }
}
