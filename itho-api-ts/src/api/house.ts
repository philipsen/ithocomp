import { Router, NextFunction, Request, Response } from 'express';
import { House } from '../models/house';
import { IthoEvent, IEventModel } from '../models/itho-event';
import { IHouseState } from '../interfaces/ihouse-state';
import { IWebappClickEvent } from '../interfaces/iwebapp-click-event';
import { IStoveStateEvent } from '../interfaces/istove-state-event';
import { WebappClickEvent } from '../models/webapp-click-event';
import { StoveStateEvent } from '../models/stove-state-event';
import { PubsubProxy } from '../proxy/pubsub-proxy';
import { SendCommandEvent } from '../models/send-command-event';
import { ISendCommandEvent } from '../interfaces/isend-command-event';
import logger from '../util/logger';


interface IRemoteId {
    name: String;
    bytes: String;
}
const remotes: IRemoteId[] = [{
    name: 'main',
    bytes: '52:50:b9'
}, {
    name: 'second',
    bytes: '52:01:01'
}
];

interface IRemoteCommand {
    name: String;
    bytes: String;
}
const remoteCommands: IRemoteCommand[] = [
    { name: 'eco', bytes: '22:f8:3:0:1:2'},
    { name: 'comfort', bytes: '22:f8:3:0:2:2'},
    { name: 'cook1', bytes: '22:f3:5:0:2:1e:2:3'},
    { name: 'cook2', bytes: '22:f3:5:0:2:3c:2:3'}
];


export class HouseApi {


    public static create(router: Router) {
        router.get('/houses', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouses(req, res, next);
        });
        router.get('/house/events/:name', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouseEvents(req, res, next);
        });
        router.get('/house/:name', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouse(req, res, next);
        });
        router.get('/house/status/:name', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouseState(req, res, next);
        });
        router.get('/command/:house/:room/:cmd', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().sendRemoteCommand(req, res, next);
        });
        router.get('/command/sendBytes/:house/:remote/:cmd', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().sendRemoteCommandBytes(req, res, next);
        });
        router.put('/house/logging/:house/:value', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().enableLogging(req, res, next);
        });
    }

    enableLogging(req: Request, res: Response, next: NextFunction): any {
        console.log('enable log', req.params.house, req.params.value);
        const message = req.params.house + '/set/≈';
        const subject = 'printNonRemote/' + req.params.value;
        new PubsubProxy().publish(message, subject);
    }

    sendRemoteCommand(req: Request, res: Response, next: NextFunction): any {
        console.log('api send command', req.params.house, req.params.room, req.params.cmd);
        WebappClickEvent.create({
            house: req.params.house,
            room: req.params.room,
            command: req.params.cmd
        });
        res.send(JSON.stringify('OK'));
        const subject = req.params.house + '/command/' + req.params.room;
        const message = req.params.cmd;
        new PubsubProxy().publish(subject, message);
        next();
    }

    sendRemoteCommandBytes(req: Request, res: Response, next: NextFunction): any {
        console.log('api send command byes', req.params.house, req.params.remote, req.params.cmd);
        const remoteId = remotes.find(r => r.name == req.params.remote).bytes;
        const remoteCommand = remoteCommands.find(r => r.name == req.params.cmd).bytes;

        SendCommandEvent.create({
            house: req.params.house,
            remote: req.params.remote,
            command: req.params.cmd
        });
        res.json({ result: 'OK' });
        const subject = 'itho/' + req.params.house + '/send';
        const message = remoteId + '/' + remoteCommand;
        new PubsubProxy().publish(subject, message);
        next();
    }

    getHouseEvents(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        IthoEvent.find({ house: name }, undefined, { sort: { 'time': -1 }, limit: 30 }).then(events => {
            res.send((events));
            next();
        }).catch(next);
    }

    getHouses(req: Request, res: Response, next: NextFunction): any {
        House.find().then(houses => {
            res.json(houses);
            next();
        }).catch(next);
    }

    getHouse(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        House.find({ name: name }).then(house => {
            res.json(house[0]);
            next();
        }).catch(next);
    }

    getHouseState(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        IthoEvent.find({ house: name }, undefined, { sort: { 'time': -1 }, limit: 1 }).then(events => {
            let state: IHouseState = {
                ventilation: 'comfort',
                ventilationBaseState: 'comfort',
                endTimeCommand: new Date
            };

            events.reverse().forEach(event => {
                state = this.applyEvent(state, event);
            });
            console.log('final state: ', state);
            res.json(state);
            next();
        }).catch(next);
    }

    applyEvent(state: IHouseState, event: IEventModel): IHouseState {
        console.log('apply: ', event.time, event.kind);
        switch (event.kind) {
            case 'WebappClick':
                const clickEvent = new WebappClickEvent(event);
                console.log('ce = ', clickEvent, WebappClickEvent);
                return this.applyWappappClickEvent(state, clickEvent);
            case 'StoveStatus':
                return this.applyStoveStatusEvent(state, new StoveStateEvent(event));
            case 'SendCommand':
                return this.applySendCommandEvent(state, new SendCommandEvent(event));
            default:
                break;
        }
        throw new Error('Unknown event: ' + event.kind);
    }
    applySendCommandEvent(state: IHouseState, event: ISendCommandEvent): IHouseState {
        logger.debug(`applySendCommandEvent: ${event.remote}, ${event.command}`);
        switch (event.command) {
            case 'eco':
                state.ventilation = 'eco';
                state.ventilationBaseState = state.ventilation;
                state.endTimeCommand = event.time;
                return state;
            case 'comfort':
                state.ventilation = 'comfort';
                state.ventilationBaseState = state.ventilation;
                state.endTimeCommand = event.time;
                return state;
            case 'cook1':
            case 'cook2':
                state.ventilation = event.command;
                state.endTimeCommand = new Date(event.time.getTime() + 60 * 1000 * (event.command === 'cook1' ? 30 : 60));
                logger.debug(`applySendCommandEvent: new end time ${state.endTimeCommand}`);
                return state;
        }
        throw new Error('State not handled');
    }

    applyStoveStatusEvent(state: IHouseState, event: IStoveStateEvent): IHouseState {
        if (event.level > 0 && event.level < 99) {
            state.ventilation = 'cook';
        } else {
            state.ventilation = state.ventilationBaseState;
        }
        return state;
    }

    applyWappappClickEvent(state: IHouseState, event: IWebappClickEvent): IHouseState {
        if (event.room === 'k') {
            if (event.command === 'eco' || event.command === 'comfort') {
                state.ventilationBaseState = event.command;
                state.ventilation = event.command;
                state.endTimeCommand = event.time;
            }
            if (event.command == 'cook1') {
                state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
                state.ventilation = 'cook';
            }
            if (event.command == 'cook2') {
                state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
                state.ventilation = 'cook';
            }
        }
        return state;
    }
}