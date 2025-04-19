import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `/${process.env.NODE_ENV.trim()}` : `.env`
});

const Config: DataSourceOptions = {
    type: "postgres", // Cambiar de "mysql" a "postgres"
    port: 5432, // Puerto por defecto de PostgreSQL
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    connectTimeoutMS: 20000, // PostgreSQL usa 'connectTimeoutMS' en lugar de 'connectTimeout'
    entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migration/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
};

export const AppDataSource: DataSource = new DataSource(Config)