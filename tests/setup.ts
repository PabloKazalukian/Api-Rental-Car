import { AppDataSource } from '../src/infrastructure/db/config/data.source';
import { ServerTest } from './setup-db';
import { RedisProvider } from '../src/infrastructure/cache/redis.client';

/**
 * Limpia los datos de las tablas y maneja el problema de los ENUMs
 */
export async function clearDatabase() {
    if (!AppDataSource.isInitialized) return;

    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.query(`TRUNCATE "${entity.tableName}" CASCADE;`);
    }
}

/**
 * Inicialización global
 */
beforeAll(async () => {
    try {
        const server = new ServerTest();

        // Conectamos DB
        await server.dbConnect();

        // Conectamos Redis y esperamos a que esté listo
        await server.initCache;

        console.log('🚀 Integration test environment ready');
    } catch (error) {
        console.error('❌ setup beforeAll failed:', error);
    }
});

/**
 * Limpieza entre cada test
 */
beforeEach(async () => {
    await clearDatabase();
});

/**
 * Cierre de procesos para evitar que Jest se quede colgado
 */
afterAll(async () => {
    console.log('🧹 Closing test connections...');

    // 1. Cerrar Base de Datos
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log('✅ DB DataSource destroyed');
    }

    // 2. Cerrar Redis usando el nuevo método
    await RedisProvider.disconnect();
});
