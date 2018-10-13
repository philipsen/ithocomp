import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { StateUpdate } from './shared/model/state-update';
import { SocketEvent } from './shared/model/socket-event';

@Component({
  selector: 'app-itho-state',
  templateUrl: './itho-state.component.html',
  styleUrls: ['./itho-state.component.css']
})
export class IthoStateComponent implements OnInit {

  ioConnection: any;
  updates: StateUpdate[] = [];
  state: StateUpdate = {house: '', state: ''};

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
    this.updates = [];
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: StateUpdate) => {
        this.updates.push(message);
        this.state = message;
        console.log('received message', message);
      });

    this.socketService.onEvent(SocketEvent.CONNECT)
      .subscribe(() => {
        console.log('connected');
        this.socketService.send('wmt6');
      });

    this.socketService.onEvent(SocketEvent.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

}
