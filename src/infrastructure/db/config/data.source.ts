import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
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
    entities: [__dirname + "/../domain/entities/*.entity{.ts,.js}"],
    migrations: [__dirname + "/../migration/*{.ts,.js}"],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
};

const ConfigTest: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'rental-car__test',
    synchronize: true,
    dropSchema: true,  // limpia la DB en cada ejecución de tests
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
};

export const AppDataSource = new DataSource(
    process.env.NODE_ENV === 'test' ? ConfigTest : Config
);