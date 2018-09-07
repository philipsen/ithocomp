import { IWebappClickEvent } from "../interfaces/iwebapp-click-event";
import { Model, model } from "mongoose";
import { webappClickEventSchema } from "../schema/webapp-click-event";

export interface IWebappClickEventModel extends IWebappClickEvent, Document {}

export interface IWebappClickEventModelStatic extends Model<IWebappClickEventModel> {}

export const WebappClickEvent = model<IWebappClickEventModel, IWebappClickEventModelStatic>("WebappClickEvent", webappClickEventSchema);
