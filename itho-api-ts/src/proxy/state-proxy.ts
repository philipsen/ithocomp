import logger from '../util/logger';
import { IRemoteId } from '../interfaces/iremote-id';
import { IRemoteCommand } from '../interfaces/iremote-command';
import { SendCommandEvent } from '../models/send-command-event';
import { SocketProxy } from './socket-proxy';
import { StateFactory } from './state-factory';
import { IthoEvent } from '../models/itho-event';
import { IHouseState } from '../interfaces/ihouse-state';

export class StateProxy {

    private static instance: StateProxy;

    createEvent(houseId: string, remoteId: IRemoteId, sender: string, remoteCommand: IRemoteCommand) {
        SendCommandEvent.create({
            house: houseId,
            remote: remoteId.name,
            sender: sender,
            command: remoteCommand.name
        }).then(res => {
            // logger.debug(`added event: ${res}`);
            this.updateState(houseId);
        });
    }

    public updateState(houseId: string) {
        IthoEvent.find({ house: houseId }, undefined, { sort: { 'time': -1 }, limit: 1 }).then(events => {
            const newState: IHouseState = new StateFactory().getState(events);
            SocketProxy.getInstance().emit({ house: houseId, state: newState.ventilation });
        });
    }

    static getInstance(): StateProxy {
        if (!StateProxy.instance) {
            StateProxy.instance = new StateProxy();
        }
        return StateProxy.instance;
    }
}
