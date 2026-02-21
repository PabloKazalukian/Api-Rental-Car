import { createClient, RedisClientType } from 'redis';

export class RedisProvider {
    private static client: RedisClientType;

    static async init(): Promise<void> {
        if (!RedisProvider.client) {
            RedisProvider.client = createClient({
                socket: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT)
                },
                username: process.env.REDIS_USER, // Redis Cloud exige usuario (normalmente "default")
                password: process.env.REDIS_PASSWORD
            });

            RedisProvider.client.on('error', (err) => {
                console.error('❌ Redis connection error:', err);
            });

            RedisProvider.client.on('connect', () => {
                console.log('✅ Redis connected to', process.env.REDIS_HOST);
            });

            await RedisProvider.client.connect().catch((err) => {
                console.warn('⚠️  Redis connection failed. Running without cache.', err.message);
                // No re-throw, allow app to start
            });
        }
    }

    static getClient(): RedisClientType {
        if (!RedisProvider.client) {
            throw new Error('Redis client not initialized. Call RedisProvider.init() first.');
        }
        return RedisProvider.client;
    }

    static set(key: string, value: string, options?: { EX: number }): Promise<string | null> {
        const client = this.getClient();
        if (options?.EX) {
            return client.set(key, value, { EX: options.EX });
        }
        return client.set(key, value);
    }

    static del(key: string): Promise<number> {
        const client = this.getClient();
        return client.del(key);
    }
}
