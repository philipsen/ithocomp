export class IthoEvent {
    time: Date;
    house: string;
    kind: string;

    printString(): string {
        return Object.create(this).toString();
    }
}

