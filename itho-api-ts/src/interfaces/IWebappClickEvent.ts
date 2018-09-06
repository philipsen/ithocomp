import { IEvent } from "./ievent";

export interface IWebappClickEvent extends IEvent {
    room: string,
    command: string
}