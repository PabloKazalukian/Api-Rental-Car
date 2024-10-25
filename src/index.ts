import http from 'http';
import bodyParser from 'body-parser';
import "reflect-metadata";
import express from 'express';
import logging from './config/logging';
import config, { ConfigServer } from './config/config';
import indexRoutes from './routes';
import morgan from 'morgan';
import { UserRouter } from './routes/user.routes';
import { ConnectOptions, DataSource } from 'typeorm';
import { CarRouter } from './routes/car.routes';
import { RequestRouter } from './routes/request.routes';
import { PaymentRouter } from './routes/payment.routes';
import { AuthRouter } from './routes/auth.routes';
import { LoginStrategy } from './strategies/login.strategy';
import { DiscountRouter } from './routes/discount.routes';
import { JwtStrategy } from './strategies/jwt.strategy';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 3001;
    private NAMESPACE = 'Server';

    constructor() {
        super();
        this.passportUse();
        this.dbConnect();
        this.configureApp();
        this.listen();
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }

    public configureApp(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        /** Log the request */
        this.app.use((req, res, next) => {

            /** Log the req */
            logging.info(this.NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                /** Log the res */
                logging.info(this.NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
            });

            next();
        });

        /** Rules of our API */
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            // res.header('Access-Control-Allow-Headers', '*');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Auth");
            res.header('Access-Control-Allow-Methods', 'GET,OPTIONS, POST, PUT, DELETE');

            if (req.method == 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });


        // this.app.use(indexRoutes);
        this.app.use("/api", this.routers());
        logging.info('Server', 'Express server is running on port ' + this.port);
    }

    public routers(): Array<express.Router> {
        return [new UserRouter().router, new CarRouter().router, new RequestRouter().router, new PaymentRouter().router, new AuthRouter().router, new DiscountRouter().router];
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use]
    }

    /** Error handling */
    public errorHandler(): void {
        this.app.use((req, res, next) => {

            const error = new Error('Not found');

            res.status(404).json({
                message: error.message
            })
        })
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    };
}

new Server();


// const NAMESPACE = 'Server';
// const router = express();

// /** Log the request */
// router.use((req, res, next) => {
//     /** Log the req */
//     logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

//     res.on('finish', () => {
//         /** Log the res */
//         logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
//     });

//     next();
// });

// /** Parse the body of the request */
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

// /** Rules of our API */
// router.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Headers', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Auth");
//     res.header('Access-Control-Allow-Methods', 'GET,OPTIONS, POST, PUT, DELETE');

//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }

//     next();
// });


// /** Routes go here */
// router.use(indexRoutes);
// // router.use(cors())

// /** Error handling */
// router.use((req, res, next) => {
//     const error = new Error('Not found');

//     res.status(404).json({
//         message: error.message
//     });
// });

// const httpServer = http.createServer(router);

// httpServer.listen(process.env.PORT || 3001, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${process.env.PORT || 3001}`));