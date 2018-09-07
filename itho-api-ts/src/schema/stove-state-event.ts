import { Schema } from "mongoose";

export let stoveStateEventSchema: Schema = new Schema({
    kind: String,
    time: { type: Date, default: Date.now },
    house: String,

    level: Number,
});
