import { IEventModel } from '../models/itho-event';

export interface IWebappClickEvent extends IEventModel {
    room: string;
    remote: string;
    command: string;
}