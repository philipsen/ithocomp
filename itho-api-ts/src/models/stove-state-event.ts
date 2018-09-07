import { IStoveStateEvent } from "../interfaces/istove-state-event";
import { Model, model } from "mongoose";
import { stoveStateEventSchema } from "../schema/stove-state-event";

export interface IStoveStateEventModel extends IStoveStateEvent, Document {}

export interface IStoveStateEventModelStatic extends Model<IStoveStateEventModel> {}

export const StoveStateEvent = model<IStoveStateEventModel, IStoveStateEventModelStatic>("StoveStateEvent", stoveStateEventSchema);
