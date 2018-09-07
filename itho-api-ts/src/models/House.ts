import { Document, Model, model } from "mongoose";
import { IHouse } from "../interfaces/ihouse";
import { houseSchema } from "../schema/house";

console.log("load House");

export interface IHouseModel extends IHouse, Document {}

export interface IHouseModelStatic extends Model<IHouseModel> {}

export const House = model<IHouseModel, IHouseModelStatic>("House", houseSchema);

