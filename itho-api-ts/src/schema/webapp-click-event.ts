import { Schema } from "mongoose";

export let webappClickEventSchema: Schema = new Schema({

    kind: String,
    time: { type: Date, default: Date.now },
    house: String,

    room: String,
    command: String
});
