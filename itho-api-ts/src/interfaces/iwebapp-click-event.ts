import { IEventModel } from "../models/itho-event";

export interface IWebappClickEvent extends IEventModel {
    room: string;
    command: string;
}