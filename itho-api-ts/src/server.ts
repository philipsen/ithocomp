
import express from 'express';
import mongoose = require('mongoose');
import dotenv from 'dotenv';
import { HouseApi } from './api/house';

import * as path from 'path';
import * as http from 'http';


import logger from './util/logger';

import { MONGODB_URI } from './util/secrets';

export class Server {

    public app: express.Application;
    private server: any;
    private port: any;
    private root: string = '';

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.server = http.createServer(this.app);
        this.api();
        this.routes();
        this.listen();
    }

    public api() {
        console.log('init api');
        const router = express.Router();
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({ announcement: 'Welcome to the api' });
            next();
        });

        HouseApi.create(router);

        this.app.use('/api', router);

    }

    public config() {
        this.port = 8080;
        dotenv.config({ path: '.env.example' });
        const mongoUrl = MONGODB_URI;
        mongoose.connect(mongoUrl);
        mongoose.connection.on('error', error => {
            console.error(error);
        });

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this.root = path.resolve(__dirname, '../../itho-app/dist/itho-app');

    }
    // this.app.use(errorHandler());
    routes(): void {
        this.app.use(express.static(this.root));

        const router = express.Router();
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const isApi = req.baseUrl.startsWith('/api');
            // logger.debug(`orig url= ${isApi}`);
            if (isApi) { next(); return;
            }
            const p = path.join(this.root, 'index.html');
            logger.debug(`path ${req.baseUrl} ${req.url} ${p}`);
            res.sendFile(p);
        });
        this.app.use('*', router);
    }

    private listen(): void {
        this.server.listen(this.port);

        this.server.on('error', (error: any) => {
            logger.error(`Http Server Error: ${error}`);
        });

        this.server.on('listening', () => {
            logger.info(`Http Server listening on port ${this.port}`);
        });
    }
}