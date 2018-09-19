import { Router, NextFunction, Request, Response } from "express";
import { House } from "../models/house";
import { IthoEvent, IEventModel } from "../models/itho-event";
import { IHouseState } from "../interfaces/ihouse-state";
import { IWebappClickEvent } from "../interfaces/iwebapp-click-event";
import { IStoveStateEvent } from "../interfaces/istove-state-event";
import { WebappClickEvent } from "../models/webapp-click-event";
import { StoveStateEvent } from "../models/stove-state-event";
import { PubsubProxy } from "../proxy/pubsub-proxy";

export class HouseApi {

    public static create(router: Router) {
        router.get("/houses", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouses(req, res, next);
        });
        router.get("/house/events/:name", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouseEvents(req, res, next);
        });
        router.get("/house/:name", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouse(req, res, next);
        });
        router.get("/house/status/:name", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouseState(req, res, next);
        });
        router.get("/command/:house/:room/:cmd", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().sendRemoteCommand(req, res, next);
        });
    }

    sendRemoteCommand(req: Request, res: Response, next: NextFunction): any {
        console.log("api send command", req.params.house, req.params.room, req.params.cmd);
        WebappClickEvent.create({
            house: req.params.house,
            room: req.params.room,
            command: req.params.cmd
        });
        res.send(JSON.stringify("OK"));
        const subject = req.params.house + "/command/" + req.params.room;
        const message = req.params.cmd;
        new PubsubProxy().publish(subject, message);
        next();
    }

    getHouseEvents(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        IthoEvent.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 30 }).then(events => {
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
        IthoEvent.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 1 }).then(events => {
            let state: IHouseState = {
                ventilation: "comfort",
                ventilationBaseState: "comfort",
                endTimeCommand: new Date
            };

            events.reverse().forEach(event => {
                state = this.applyEvent(state, event);
            });
            console.log("final state: ", state);
            res.json(state);
            next();
        }).catch(next);
    }

    applyEvent(state: IHouseState, event: IEventModel): IHouseState {
        console.log("apply: ", event.time, event.kind);
        switch (event.kind) {
            case "WebappClick":
                const clickEvent = new WebappClickEvent(event);
                console.log("ce = ", clickEvent, WebappClickEvent);
                return this.applyWappappClickEvent(state, clickEvent);
            case "StoveStatus":
                return this.applyStoveStatusEvent(state, new StoveStateEvent(event));
            default:
                break;
        }
        throw new Error("Unknown event: " + event.kind);
    }

    applyStoveStatusEvent(state: IHouseState, event: IStoveStateEvent): IHouseState {
        if (event.level > 0 && event.level < 99) {
            state.ventilation = "cook";
        } else {
            state.ventilation = state.ventilationBaseState;
        }
        return state;
    }

    applyWappappClickEvent(state: IHouseState, event: IWebappClickEvent): IHouseState {
        if (event.room === "k") {
            if (event.command === "eco" || event.command === "comfort") {
                state.ventilationBaseState = event.command;
                state.ventilation = event.command;
                state.endTimeCommand = event.time;
            }
            if (event.command == "cook1") {
                state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
                state.ventilation = "cook";
            }
            if (event.command == "cook2") {
                state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
                state.ventilation = "cook";
            }
        }
        return state;
    }
}