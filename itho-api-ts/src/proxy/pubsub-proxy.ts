
import logger from '../util/logger';
import mqtt from 'mqtt';
import { MQTT_HOST, MQTT_USER, MQTT_PASSWD } from '../util/secrets';
import { House } from '../models/house2';
import { remotes, remoteCommands } from '../models/remotes-defenitions';
import { StateProxy } from './state-proxy';

export class PubsubProxy {
    private static instance: PubsubProxy;
    private client: mqtt.Client;

    private constructor() {
        logger.debug(`PubsubProxy.ctor ${MQTT_HOST} ${MQTT_USER} ${MQTT_PASSWD}`);
        this.client = mqtt.connect({
            host: MQTT_HOST,
            username: MQTT_USER,
            password: MQTT_PASSWD
        });
        this.client.on('connect', () => {
            this.client.publish('itho/log/all', 'backend connected');
            const topic = 'itho/log/+';
            this.client.subscribe(topic, (err) => {
                if (err) {
                    logger.error(err);
                }
                console.log(`PubsubProxy: subscribed ${topic}`);
            });
        });
        this.client.on('message', (topic, payload   ) => {
            logger.debug(`PubsubProxy received: ${topic} -> ${payload}`);
            if (payload.toString().startsWith('ip=')) {
                const house = topic.toString().split('/')[2];
                const ip = payload.toString().split('=')[1];
                logger.info(`PubsubProxy register if needed ${house} ${ip}`);
                House.findOneAndUpdate({name: house}, {name: house, ip: ip}, { 'upsert': true}, (err) => {
                    if (err) {
                        logger.error(`error inserting ${house}`);
                    }
                });
            }
            if (payload.toString().startsWith('send/')) {
                const payloadSubstrings = payload.toString().split('/');
                const houseId = topic.toString().split('/')[2];
                logger.debug(`got send ${payloadSubstrings[1]} -> ${payloadSubstrings[2]} - ${payloadSubstrings[3]}`);
                const sender = payloadSubstrings[1];
                const remoteId = remotes.find(r => r.bytes === payloadSubstrings[2]);
                const remoteCommand = remoteCommands.find(r => r.bytes == payloadSubstrings[3]);
                if (remoteId == undefined) {
                    logger.warn(`received command from unkonw remote: ${payloadSubstrings[2]}`);
                    return;
                }
                if (remoteCommand == undefined) {
                    logger.warn(`received unknown remote command: ${payloadSubstrings[3]}`);
                    return;
                }
                StateProxy.getInstance().createEvent(houseId, remoteId, sender, remoteCommand);
            }
        });
    }

    publish(subject: string, message: string): void {
        this.client.publish(subject, message);
    }

    static getInstance(): PubsubProxy {
        if (!PubsubProxy.instance) {
            PubsubProxy.instance = new PubsubProxy();
        }
        return PubsubProxy.instance;
    }
}

