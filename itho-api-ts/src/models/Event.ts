import { Document, Schema, Model, model } from "mongoose";
import { IEvent } from "../interfaces/ievent";

console.log("load Event");

export interface IEventModel extends IEvent, Document {
}

const options = { discriminatorKey: 'kind' };
export var EventSchema: Schema = new Schema({
  kind: String,
    time: {
      type: Date,
      default: Date.now
    },
    house: String
  }
 ,  options
);

//const Event = mongoose.model("Event", eventSchema);
//export default Event;
export const Event: Model<IEventModel> = model<IEventModel>("Event", EventSchema);

