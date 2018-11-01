import { IRemoteId } from '../interfaces/iremote-id';
import { IRemoteCommand } from '../interfaces/iremote-command';

export const remotes: IRemoteId[] = [
    { name: 'wmt6/main', bytes: '52:50:b9' },
    { name: 'wmt6/second', bytes: '74:f3:af' },
    { name: 'wmt40/main', bytes: '52:4c:6d' },
    { name: 'wmt40/second', bytes: '74:f3:af' },
    { name: 'wmt28/main', bytes: '52:4d:45' },
    { name: 'wmt28/second', bytes: '74:f3:af' }
];
export const remoteCommands: IRemoteCommand[] = [
    { name: 'eco', bytes: '22:f8:3:0:1:2' },
    { name: 'comfort', bytes: '22:f8:3:0:2:2' },
    { name: 'cook1', bytes: '22:f3:5:0:2:1e:2:3' },
    { name: 'cook2', bytes: '22:f3:5:0:2:3c:2:3' },
    { name: 's_timer1', bytes: '22:f3:3:63:80:1' },
    { name: 's_timer2', bytes: '22:f3:3:63:80:2' },
    { name: 's_timer3', bytes: '22:f3:3:63:80:3' },
    { name: 's_auto', bytes: '22:f1:3:63:3:4' }
];