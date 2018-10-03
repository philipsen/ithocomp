import { IEventModel } from '../models/itho-event';

export interface ISendCommandEvent extends IEventModel {
    house: string;
    sender: string;
    remote: string;
    command: string;
}