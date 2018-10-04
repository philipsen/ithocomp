import { Schema } from 'mongoose';

export let sendCommandEventSchema: Schema = new Schema({
    house: String,
    sender: String,
    remote: String,
    command: String
});
