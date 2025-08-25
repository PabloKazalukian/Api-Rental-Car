import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logging from './infrastructure/config/logging';
import morgan from 'morgan';
import { ConfigServer } from './infrastructure/config/config';
import { DataSource } from 'typeorm';
import { LoginStrategy } from './infrastructure/security/strategies/login.strategy';
import { JwtStrategy } from './infrastructure/security/strategies/jwt.strategy';
import { GoogleOAuthStrategy } from './infrastructure/security/strategies/google.strategy';
import { UserRouter } from "./infrastructure/interfaces/http/routes/user.routes";
import { AuthRouter } from "./infrastructure/interfaces/http/routes/auth.routes";
import { CarRouter } from "./infrastructure/interfaces/http/routes/car.routes";
import { RequestRouter } from "./infrastructure/interfaces/http/routes/request.routes";
import { PaymentRouter } from "./infrastructure/interfaces/http/routes/payment.routes";
import { DiscountRouter } from "./infrastructure/interfaces/http/routes/discount.routes";
import { EmailRouter } from "./infrastructure/interfaces/http/routes/email.routes";
import { UserDiscountRouter } from "./infrastructure/interfaces/http/routes/user-discount.route";

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

    //Prueba de si funcionan las variables de entorno.
    debug(): void {
        console.log(
            process.env.DB_HOST,
            process.env.DB_PORT,
            process.env.DB_USER,
            process.env.DB_PASSWORD ? "✅ Present" : "❌ Vacía",)
    };

    //Conexion de la base de datos.
    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }

    //Configuraciones del servidor.
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

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof SyntaxError && "body" in err) {
                return res.status(400).json({
                    error: "JSON inválido",
                    detail: err.message, // opcional, podés sacarlo si no querés dar tanta info
                });
            }

            next(err);
        });

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

        // this.app.use(indexRoutes);
        this.app.use("/api", this.routers());
        // Agrega esta línea
        this.errorHandler();
        logging.info('Server', 'Express server is running on port ' + this.port);
    }

    //Ruteo
    public routers(): Array<express.Router> {
        return [UserRouter, AuthRouter, CarRouter, RequestRouter, PaymentRouter, DiscountRouter, EmailRouter, UserDiscountRouter];
    }

    //Configuracion de las estrategias implementadas para autenticacion con passport
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