import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
    constructor() {
        dotenv.config();
    }

    public getEnvironment(k: string): string | undefined {
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k));
    }

    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }
}


// dotenv.config();

const MYSQL_HOST = process.env.DB_HOST;
const MYSQL_DATABASE = process.env.DB_DATABASE;
const MYSQL_USER = process.env.DB_USER;
const MYSQL_PASS = process.env.DB_PASSWORD;
const MYSQL_PORT = process.env.DB_PORT;


const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS,
    port: MYSQL_PORT
};

const AUTH_JWT: string = process.env.AUTH_JWT || "SECRETO";

const AUTH = {
    key: AUTH_JWT,
    expires: "24h",
};

const config = {
    mysql: MYSQL,
    auth: AUTH,
};

export default config;
