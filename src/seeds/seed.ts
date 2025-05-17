import { AppDataSource } from "../config/data.source";
import { CarSeeder } from "./car.seed";
import { UserSeeder } from "./user.seed";


async function runSeeds() {
    try {
        // await AppDataSource.initialize();

        await new UserSeeder().run();
        await new CarSeeder().run();

        console.log('Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

runSeeds();