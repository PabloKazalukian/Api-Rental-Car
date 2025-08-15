// test/setup.ts
// import { seedDiscounts } from './seeds/discount.seed';

import { AppDataSource } from "../src/config/data.source"
import { ServerTest } from "./setup-db";

beforeAll(async () => {

    const server = new ServerTest();
    await server.dbConnect();
});

afterAll(async () => {
    if (AppDataSource.isInitialized) {
        console.log('🧹 Cerrando DataSource...');
        await AppDataSource.destroy();
        console.log('✅ DataSource destruido');
    }
});
