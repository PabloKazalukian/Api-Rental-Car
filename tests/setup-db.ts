import { ConfigServer } from '../src/infrastructure/config/config';
import { DataSource } from 'typeorm';

export class ServerTest extends ConfigServer {
    constructor() {
        super();
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log('Data Source has been initialized!');
            })
            .catch((err) => {
                console.error('Error during Data Source initialization', err);
            });
    }
}
