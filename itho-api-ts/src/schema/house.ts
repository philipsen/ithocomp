import { Schema } from "mongoose";

export let houseSchema: Schema = new Schema({
    name: { type: String, unique: true },
    ip: String
});