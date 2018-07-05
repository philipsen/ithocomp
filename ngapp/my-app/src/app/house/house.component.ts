import { Component, OnInit } from '@angular/core';
import { House } from '../house';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  house: House = {
    name: 'wmt6',
    ip: '1.2.3.4'
  }

  constructor() { }

  ngOnInit() {
  }

}
