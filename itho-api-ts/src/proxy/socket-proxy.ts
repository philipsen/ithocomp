import { StateUpdate } from '../models/state-update';
import { StateProxy } from './state-proxy';

export class SocketProxy {


    private static instance: SocketProxy;

    private io: SocketIO.Server;

    static getInstance(): SocketProxy {
        if (!SocketProxy.instance) {
            SocketProxy.instance = new SocketProxy();
        }
        return SocketProxy.instance;
    }

    emit(update: StateUpdate ): any {
        this.io.emit('message', update);
    }

    init(io: SocketIO.Server): void {
        this.io = io;

        this.io.on('connect', (socket: any) => {
            console.log('Connected client.');

            socket.on('register', (m: string) => {
                console.log('[server](register): %s', m);
                StateProxy.getInstance().updateState(m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }


}