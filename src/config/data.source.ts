import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `/${process.env.NODE_ENV.trim()}` : `.env`
});

const Config: DataSourceOptions = {

    type: "mysql",
    port: 47239,
    host: 'centerbeam.proxy.rlwy.net',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 20000, // Aumenta el timeout a 20 segundos
    entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migration/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
}

export const AppDataSource: DataSource = new DataSource(Config)