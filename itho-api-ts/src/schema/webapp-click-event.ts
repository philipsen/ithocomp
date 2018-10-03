import { Schema } from 'mongoose';

export let webappClickEventSchema: Schema = new Schema({
    room: String,
    remote: String,
    command: String
});
