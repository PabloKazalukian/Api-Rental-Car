import dotenv from "dotenv";
import { DataSource } from "typeorm";
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
        try {
            if (AppDataSource.isInitialized) {
                return Promise.resolve(AppDataSource); // Ya está conectado
            }
            return AppDataSource.initialize(); // Lo conecta si aún no lo está
        } catch (error: any) {
            throw new Error(`Failed to initialize repository: ${error.message}`);
        }
    }
}