import { IWebappClickEvent } from "../interfaces/iwebapp-click-event";
import { Model, model } from "mongoose";
import { webappClickEventSchema } from "../schema/webapp-click-event";
import { IthoEvent } from "./itho-event";

export interface IWebappClickEventModel extends IWebappClickEvent, Document {}

export interface IWebappClickEventModelStatic extends Model<IWebappClickEventModel> {}

export const WebappClickEvent2 =
  model<IWebappClickEventModel, IWebappClickEventModelStatic>("WebappClickEvent", 
  webappClickEventSchema);

  export const WebappClickEvent = IthoEvent.discriminator("WebappClick", webappClickEventSchema);
