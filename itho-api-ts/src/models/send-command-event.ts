import { ISendCommandEvent } from '../interfaces/isend-command-event';
import { Model, model } from 'mongoose';
import { sendCommandEventSchema } from '../schema/send-command-event';
import { IthoEvent } from './itho-event';

export interface ISendCommandEventModel extends ISendCommandEvent, Document {}

export interface ISendCommandEventModelStatic extends Model<ISendCommandEventModel> {}
export const SendCommandEventDiscriminator = IthoEvent.discriminator('SendCommand', sendCommandEventSchema);
export const SendCommandEvent = model<ISendCommandEventModel, ISendCommandEventModelStatic>('SendCommand');

