import { Router, NextFunction, Request, Response } from 'express';
import { PubsubProxy } from '../proxy/pubsub-proxy';
import { remotes, remoteCommands } from '../models/remotes-defenitions';
import logger from '../util/logger';

export class RemoteApi {
    public static create(router: Router) {
        router.get('/command/sendBytes/:house/:remote/:cmd', (req: Request, res: Response, next: NextFunction) => {
            new RemoteApi().sendRemoteCommandBytes(req, res, next);
        });
    }

    sendRemoteCommandBytes(req: Request, res: Response, next: NextFunction): any {
        logger.debug(`api send command byes ${req.params.house} ${req.params.remote} ${req.params.cmd}`);
        const remoteKey = req.params.house + '/' + req.params.remote;
        const remoteId = remotes.find(r => r.name == remoteKey).bytes;
        const remoteCommand = remoteCommands.find(r => r.name == req.params.cmd).bytes;
        res.json({ result: 'OK' });
        const subject = 'itho/' + req.params.house + '/send';
        const message = remoteId + '/' + remoteCommand;
        PubsubProxy.getInstance().publish(subject, message);
        next();
    }
}