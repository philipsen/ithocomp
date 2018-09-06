
import mongoose from "mongoose";
console.log("load House");

export type HouseModel = mongoose.Document & {
    name: String,
    ip: String
};

const houseSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    ip: String
});

const House = mongoose.model("House", houseSchema);
export default House;
