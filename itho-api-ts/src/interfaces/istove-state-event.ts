import { IEventModel } from "../models/itho-event";

export interface IStoveStateEvent extends IEventModel {
    level: Number;
}