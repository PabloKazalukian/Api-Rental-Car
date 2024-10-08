import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {
    constructor() {
        dotenv.config();
    }

    public getEnverioment(k: string): string | undefined {
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnverioment(k));
    }

    public get typeORMConfig(): DataSourceOptions {

        return {
            type: "mysql",
            host: this.getEnverioment("DB_HOST"),
            username: this.getEnverioment("DB_USER"),
            password: this.getEnverioment("DB_PASSWORD"),
            database: this.getEnverioment("DB_DATABASE"),
            entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*.{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy()
        }
    }

    async dbConnect(): Promise<DataSource> {
        return await new DataSource((this.typeORMConfig)).initialize()
    }
}


// dotenv.config();

const MYSQL_HOST = process.env.DB_HOST;
const MYSQL_DATABASE = process.env.DB_DATABASE;
const MYSQL_USER = process.env.DB_USER;
const MYSQL_PASS = process.env.DB_PASSWORD;

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS,
};

// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
// const SERVER_PORT = process.env.PORT || 3001;

// interface Server {
//     port: number | string;
//     hostname: string;
// };

// const SERVER: Server = {
//     hostname: SERVER_HOSTNAME,
//     port: SERVER_PORT,
// };

const AUTH_JWT: string = process.env.AUTH_JWT || "SECRETO";

const AUTH = {
    key: AUTH_JWT,
    expires: "24h",
};

const config = {
    mysql: MYSQL,
    // server: SERVER,
    auth: AUTH,
};

export default config;
