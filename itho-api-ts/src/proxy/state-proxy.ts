import logger from '../util/logger';
import { IRemoteId } from '../interfaces/iremote-id';
import { IRemoteCommand } from '../interfaces/iremote-command';
import { SendCommandEvent } from '../models/send-command-event';

export class StateProxy {

    createEvent(houseId: string, remoteId: IRemoteId, sender: string, remoteCommand: IRemoteCommand) {
        SendCommandEvent.create({
            house: houseId,
            remote: remoteId.name,
            sender: sender,
            command: remoteCommand.name
        }).then(res => {
            logger.debug(`added event: ${res}`);
        });
    }
    private static instance: StateProxy;

    static getInstance(): StateProxy {
        if (!StateProxy.instance) {
            StateProxy.instance = new StateProxy();
        }
        return StateProxy.instance;
    }
}