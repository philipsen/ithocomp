
import mqtt from "mqtt";

export class PubsubProxy {

    constructor() {
    }

    publish(subject: string, message: string): void {
        const client = mqtt.connect({
            host: "167.99.32.103",
            username: "itho",
            password: "aapnootmies"});
        client.publish(subject, message);
    }

    private client: mqtt.Client;

}