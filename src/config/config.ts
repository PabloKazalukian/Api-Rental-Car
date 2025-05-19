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
        if (AppDataSource.isInitialized) {
            return Promise.resolve(AppDataSource); // Ya está conectado
        }
        return AppDataSource.initialize(); // Lo conecta si aún no lo está
    }
}