import { IHouseState } from '../interfaces/ihouse-state';

export class HouseState implements IHouseState {
    ventilation: String;
    ventilationBaseState: String;
    endTimeCommand: Date;

}