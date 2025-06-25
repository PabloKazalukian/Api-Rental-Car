import cors from 'cors';
import "reflect-metadata";
import express from 'express';
import logging from './config/logging';
import { ConfigServer } from './config/config';
import morgan from 'morgan';
import { UserRouter } from './routes/user.routes';
import { DataSource } from 'typeorm';
import { CarRouter } from './routes/car.routes';
import { RequestRouter } from './routes/request.routes';
import { PaymentRouter } from './routes/payment.routes';
import { AuthRouter } from './routes/auth.routes';
import { LoginStrategy } from './strategies/login.strategy';
import { DiscountRouter } from './routes/discount.routes';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleOAuthStrategy } from './strategies/google.strategy';
import cookieParser from 'cookie-parser';
import { EmailRouter } from './routes/email.routes';

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
    debug(): void {
        console.log(
            process.env.DB_HOST,
            process.env.DB_PORT,
            process.env.DB_USER,
            process.env.DB_PASSWORD ? "✅ Present" : "❌ Vacía",)
    };


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
        this.app.use(cookieParser());

        /**CORS config */
        this.app.use(cors({
            origin: ['https://rental-car-ag4g-o8avo0z00-pablokazalukians-projects.vercel.app', 'https://rental-car-pablo-kaza.vercel.app', 'http://localhost:4200'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Auth'],
            credentials: true,
        }));

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
        // this.app.use((req, res, next) => {
        //     console.log('Headers:', req.headers);
        //     console.log('Cookies:', req.headers.cookie);
        //     next();
        // });

        // this.app.use(indexRoutes);
        this.app.use("/api", this.routers());
        // Agrega esta línea
        this.errorHandler();
        logging.info('Server', 'Express server is running on port ' + this.port);
    }

    public routers(): Array<express.Router> {
        return [new UserRouter().router, new CarRouter().router, new RequestRouter().router, new PaymentRouter().router, new AuthRouter().router, new DiscountRouter().router, new EmailRouter().router];
    }

    passportUse() {
        new LoginStrategy().use;
        new JwtStrategy().use;
        new GoogleOAuthStrategy().use;
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