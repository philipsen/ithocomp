import { Schema } from "mongoose";

export let eventSchema: Schema = new Schema({
  kind: String,
  time: { type: Date, default: Date.now },
  house: String,
});
