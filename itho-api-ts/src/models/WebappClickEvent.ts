// import { Document, Schema, Model, model } from "mongoose";
// import { IEventModel, Event } from "./event";
// import { IWebappClickEvent } from "../interfaces/IWebappClickEvent";

// console.log("load WebappClickEvent");

// export interface IWebappClickEventModel extends IWebappClickEvent, Document {

// }

// const options = { discriminatorKey: "kind" };

// export let WebappClickEventSchema: Schema = new Schema({
//     room: { type: String, required: true },
//     command: { type: String, required: true }
// }, options);

// // Event.discriminator()

// // const WebappClickEvent = Event.discriminator("WebappClickEvent", webappClickEventSchema);
// // export default WebappClickEvent;
// export const WebappClickEvent: Model<IEventModel> = Event.discriminator("WebappClickEvent", WebappClickEventSchema);

