import { Schema } from "mongoose";

const eventOptions = {
  discriminatorKey: "kind"
};

export let eventSchema: Schema = new Schema({
  kind: String,
  time: { type: Date, default: Date.now },
  house: String,
}, eventOptions);
