import { Router, NextFunction, Request, Response } from 'express';
import { SendCommandEvent } from '../models/send-command-event';
import { PubsubProxy } from '../proxy/pubsub-proxy';

interface IRemoteId {
    name: String;
    bytes: String;
}
const remotes: IRemoteId[] = [
    { name: 'wmt6/main',    bytes: '52:50:b9' },
    { name: 'wmt6/second',  bytes: '74:f3:af'},
    { name: 'wmt40/main',   bytes: '52:4c:6d' },
    { name: 'wmt40/second', bytes: '74:f3:af'},
    { name: 'wmt28/main',   bytes: '52:4d:45' },
    { name: 'wmt28/second', bytes: '74:f3:af'}
];

interface IRemoteCommand {
    name: String;
    bytes: String;
}
const remoteCommands: IRemoteCommand[] = [
    { name: 'eco', bytes:      '22:f8:3:0:1:2'},
    { name: 'comfort', bytes:  '22:f8:3:0:2:2'},
    { name: 'cook1', bytes:    '22:f3:5:0:2:1e:2:3'},
    { name: 'cook2', bytes:    '22:f3:5:0:2:3c:2:3'},
    { name: 's_timer1', bytes: '22:f3:03:63:80:01'},
    { name: 's_timer2', bytes: '22:f3:03:63:80:02'},
    { name: 's_timer3', bytes: '22:f3:03:63:80:03'},
    { name: 's_auto', bytes:   '22:f1:03:63:03:04'}
];

export class RemoteApi {
    public static create(router: Router) {
        router.get('/command/sendBytes/:house/:remote/:cmd', (req: Request, res: Response, next: NextFunction) => {
            new RemoteApi().sendRemoteCommandBytes(req, res, next);
        });
    }

    sendRemoteCommandBytes(req: Request, res: Response, next: NextFunction): any {
        console.log('api send command byes', req.params.house, req.params.remote, req.params.cmd);
        const remoteKey = req.params.house + '/' + req.params.remote;
        const remoteId = remotes.find(r => r.name == remoteKey).bytes;
        const remoteCommand = remoteCommands.find(r => r.name == req.params.cmd).bytes;

        SendCommandEvent.create({
            house: req.params.house,
            remote: req.params.remote,
            command: req.params.cmd
        });
        res.json({ result: 'OK' });
        const subject = 'itho/' + req.params.house + '/send';
        const message = remoteId + '/' + remoteCommand;
        PubsubProxy.getInstance().publish(subject, message);
        next();
    }
}