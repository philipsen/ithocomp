import { Router, NextFunction, Request, Response } from "express";
import { House } from "../models/House";
import { IthoEvent } from "../models/itho-event";

export class HouseApi {

    public static create(router: Router) {
        router.get("/houses", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouses(req, res, next);
        });
        router.get("/house/events/:name", (req: Request, res: Response, next: NextFunction) => {
            new HouseApi().getHouseEvents(req, res, next);
        });
    }
    getHouseEvents(req: Request, res: Response, next: NextFunction): any {
        const name = req.params.name;
        IthoEvent.find({ house: name }, undefined, { sort: { "time": -1 }, limit: 300 }).then(events => {
            res.send(JSON.stringify(events));
            next();
            }).catch(next);
    }

    getHouses(req: Request, res: Response, next: NextFunction): any {
        House.find().then(houses => {
            res.json(JSON.stringify(houses));
            next();
        }).catch(next);
    }


}