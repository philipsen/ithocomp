import { Router, NextFunction, Request, Response } from 'express';
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
import { House } from '../models/house2';
import { StateFactory } from '../proxy/state-factory';


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
        router.put('/house/logging/:house/:value', (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().enableLogging(req, res, next);
        });
    }

    enableLogging(req: Request, res: Response, next: NextFunction): any {
        console.log('enable log', req.params.house, req.params.value);
        const message = req.params.house + '/set/≈';
        const subject = 'printNonRemote/' + req.params.value;
        PubsubProxy.getInstance().publish(message, subject);
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
            const state: IHouseState = new StateFactory().getState(events);
            res.json(state);
            next();
        }).catch(next);
    }
}
