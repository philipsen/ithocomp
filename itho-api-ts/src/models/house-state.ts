import { IHouseState } from '../interfaces/ihouse-state';

export class HouseState implements IHouseState {
    ventilation: string;
    ventilationBaseState: string;
    endTimeCommand: Date;

}