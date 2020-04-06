import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { StateUpdate } from '../model/state-update';
import { Observable } from 'rxjs';
import { SocketEvent } from '../model/socket-event';


const SERVER_URL = 'localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL, {transports: ['ws']});
  }

  public send(message: string): void {
      console.log('init socket');
      this.socket.emit('register', message);
  }

  public onMessage(): Observable<StateUpdate> {
    return new Observable<StateUpdate>(observer => {
      this.socket.on('message', (data: StateUpdate) => observer.next(data));
    });
  }

  public onEvent(event: SocketEvent): Observable<any> {
    return new Observable<SocketEvent>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
