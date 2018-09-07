import { Router, NextFunction, Request, Response } from "express";
import { House } from "../models/house";
import { IthoEvent, IEventModel } from "../models/itho-event";
import { IHouseState } from "../interfaces/ihouse-state";
import { IWebappClickEvent } from "../interfaces/iwebapp-click-event";
import { IStoveStateEvent } from "../interfaces/istove-state-event";
import { HouseState } from "../models/house-state";
import { WebappClickEvent } from "../models/webapp-click-event";
import { StoveStateEvent } from "../models/stove-state-event";
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
    }

    getHouseEvents(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        IthoEvent.find({ house: name }, undefined, { sort: { "time": 1 }, limit: 1 }).then(events => {
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
        IthoEvent.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 300 }).then(events => {
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
                return this.applyWappappClickEvent(state, new WebappClickEvent(event));
            case "StoveStatus":
                return this.applyStoveStatusEvent(state, new StoveStateEvent(event));
            default:
                break;
        }
        throw new Error("Unknown event: " + event.kind);
    }

    applyStoveStatusEvent(state: IHouseState, event: IStoveStateEvent): IHouseState {
        // console.log("state in: ", state, event.level);
        state.ventilation = state.ventilation;
        if (event.level > 0 && event.level < 99) {
            state.ventilation = "cook";
        } else {
            state.ventilation = state.ventilationBaseState;
        }
        // console.log("state out: ", state);
        return state;
    }

    applyWappappClickEvent(state: IHouseState, event: IWebappClickEvent): IHouseState {
        // console.log("state in: ", state, event, event["room"]);
        // console.log("room = ", event.room, event.kind);
        if (event.room === "k") {
            // console.log("here");
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
        // console.log("state out: ", state);
        return state;
    }

    // // app.get('/api/house/status/:name', apiController.
    // export let getHouseStatus = (req: Request, res: Response) => {
    // console.log("get state");
    // const name = req.params.name;
    // // var Event = mongoose.model('Event');
    // Event.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 200 },
    //  function (err: any, events: EventModel[]) {
    //   if (err) return console.error(err);
    //   events.reverse();
    //   const state: HouseState = new HouseState;
    //   state.ventilation = "none";

    // let fs = events.reduce((state, event) => {
    //   console.log('e = ', event, event.time, event.house, event.kind);
    //   //     if (event.kind === 'StoveStatus') {
    //   //       if (event.level > 0) {
    //   //         state.ventilation = "cook";
    //   //       } else {
    //   //         state.ventilation = state.ventilationBaseState;
    //   //       }
    //   //     }
    //   if (event.kind === 'WebappClick') {
    //     var e = WebappClickEvent.create(event);

    //     if (e.room === 'k') {
    //       if (event.command === 'eco' || event.command === 'comfort') {
    //         state.ventilationBaseState = event.command;
    //         state.ventilation = event.command;
    //         state.endTimeCommand = event.time;
    //       }
    //       if (event.command == 'cook1') {
    //         state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
    //         state.ventilation = 'cook';
    //       }
    //       if (event.command == 'cook2') {
    //         state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
    //         state.ventilation = 'cook';
    //       }

    //     }
    //   }
    //   console.log('cs = ', state);
    //   return state;
    // }, state);
    //   if (fs.endTimeCommand < new Date()) {
    //     //console.log('last comm expired');
    //     fs.ventilation = fs.ventilationBaseState;

    //   //} else {
    // console.log('last comm still active');

    //  });
    //     const fs2 = state;
    //     console.log("final =", fs2);
    //     res.send(JSON.stringify(fs2));
    // });
    // };

}