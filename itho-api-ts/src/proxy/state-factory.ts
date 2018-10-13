import { IEventModel } from '../models/itho-event';
import { IHouseState } from '../interfaces/ihouse-state';
import { WebappClickEvent } from '../models/webapp-click-event';
import { StoveStateEvent } from '../models/stove-state-event';
import { SendCommandEvent } from '../models/send-command-event';
import { ISendCommandEvent } from '../interfaces/isend-command-event';
import logger from '../util/logger';
import { IStoveStateEvent } from '../interfaces/istove-state-event';
import { IWebappClickEvent } from '../interfaces/iwebapp-click-event';

export class StateFactory {

    getState(events: IEventModel[]) {
        let state: IHouseState = {
            ventilation: 'comfort',
            ventilationBaseState: 'comfort',
            endTimeCommand: new Date
        };
        events.reverse().forEach(event => {
            state = this.applyEvent(state, event);
        });
        console.log('final state: ', state);
        return state;
    }


    applyEvent(state: IHouseState, event: IEventModel): IHouseState {
        console.log('apply: ', event.time, event.kind);
        switch (event.kind) {
            // case 'WebappClick':
            //     const clickEvent = new WebappClickEvent(event);
            //     console.log('ce = ', clickEvent, WebappClickEvent);
            //     return this.applyWappappClickEvent(state, clickEvent);
            // case 'StoveStatus':
            //     return this.applyStoveStatusEvent(state, new StoveStateEvent(event));
            case 'SendCommand':
                return this.applySendCommandEvent(state, new SendCommandEvent(event));
            default:
                break;
        }
        throw new Error('Unknown event: ' + event.kind);
    }

    applySendCommandEvent(state: IHouseState, event: ISendCommandEvent): IHouseState {
        logger.debug(`applySendCommandEvent: ${event.remote}, ${event.command}`);
        switch (event.command) {
            case 'eco':
                state.ventilation = 'Eco';
                state.ventilationBaseState = state.ventilation;
                state.endTimeCommand = event.time;
                return state;
            case 'comfort':
                state.ventilation = 'Comfort';
                state.ventilationBaseState = state.ventilation;
                state.endTimeCommand = event.time;
                return state;
            case 'cook1':
            case 'cook2':
                state.ventilation = 'Keuken';
                state.endTimeCommand = new Date(event.time.getTime() + 60 * 1000 * (event.command === 'cook1' ? 30 : 60));
                logger.debug(`applySendCommandEvent: new end time ${state.endTimeCommand}`);
                return state;
            case 's_timer1':
            case 's_timer2':
                state.ventilation = 'Badkamer';
                state.endTimeCommand = new Date(event.time.getTime() + 60 * 1000 * (event.command === 's_timer1' ? 10 : 20));
                logger.debug(`applySendCommandEvent: new end time ${state.endTimeCommand}`);
                return state;
            case 's_auto':
                state.ventilation = 'Eco';
                state.ventilationBaseState = state.ventilation;
                state.endTimeCommand = event.time;
                return state;
        }
        throw new Error('State not handled');
    }

    // applyStoveStatusEvent(state: IHouseState, event: IStoveStateEvent): IHouseState {
    //     if (event.level > 0 && event.level < 99) {
    //         state.ventilation = 'cook';
    //     } else {
    //         state.ventilation = state.ventilationBaseState;
    //     }
    //     return state;
    // }

    // applyWappappClickEvent(state: IHouseState, event: IWebappClickEvent): IHouseState {
    //     if (event.room === 'k') {
    //         if (event.command === 'eco' || event.command === 'comfort') {
    //             state.ventilationBaseState = event.command;
    //             state.ventilation = event.command;
    //             state.endTimeCommand = event.time;
    //         }
    //         if (event.command == 'cook1') {
    //             state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
    //             state.ventilation = 'cook';
    //         }
    //         if (event.command == 'cook2') {
    //             state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
    //             state.ventilation = 'cook';
    //         }
    //     }
    //     return state;
    // }


}
