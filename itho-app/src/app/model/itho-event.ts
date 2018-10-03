export class IthoEvent {
    time: Date;
    house: String;
    kind: String;

    printString(): String {
        return Object.create(this).toString();
    }
}

