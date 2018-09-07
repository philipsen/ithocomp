import { Document, Model, model } from "mongoose";
import { IEvent } from "../interfaces/ievent";
import { eventSchema } from "../schema/event";

console.log("load Event");

export interface IEventModel extends IEvent, Document {}

export interface IEventModelStatic extends Model<IEventModel> {}

export const IthoEvent = model<IEventModel, IEventModelStatic>("Event", eventSchema);


