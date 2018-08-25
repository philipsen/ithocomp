import { IthoEvent } from "./itho-event";

export class IthoWebappClickEvent extends IthoEvent {
    room: string
    command: string
}
