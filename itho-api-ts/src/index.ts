
import * as server from './server';
import { PubsubProxy } from './proxy/pubsub-proxy';

PubsubProxy.getInstance();

const app = server.Server.bootstrap().app;
export default server;

