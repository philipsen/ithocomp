import { Response, Request, NextFunction } from "express";

export let getApi = (req: Request, res: Response) => {
    res.jsonp({a: "bla"});
};
