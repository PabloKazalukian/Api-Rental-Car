import request from 'supertest';
import { Server } from '../../../src/app';
import { UserRole } from '../../../src/domain/entities/user';
import { AppDataSource } from '../../../src/infrastructure/db/config/data.source';

const app = new Server().app;

describe('👤 User Integration Tests', () => {
    it('debería registrar un nuevo usuario exitosamente', async () => {
        const userData = {
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            role: UserRole.USER
        };

        const response = await request(app).post('/api/user').send(userData);

        expect(response.status).toBe(201);
        expect(response.body.statusMsg).toBe('Created');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.username).toBe(userData.username);
        expect(response.body.data.email).toBe(userData.email);
    });

    // it('debería fallar si el email es inválido (Middleware Validation)', async () => {
    //     const userData = {
    //         username: 'testuser2',
    //         password: 'password123',
    //         email: 'not-an-email',
    //         role: UserRole.USER
    //     };

    //     const response = await request(app)
    //         .post('/api/user')
    //         .send(userData);

    //     expect(response.status).toBe(400);
    //     expect(response.body.statusMsg).toBe('Bad Request');
    //     // El validador devuelve un mensaje de error detallado
    //     expect(response.body.message).toBeDefined();
    // });

    it('debería obtener un usuario por ID', async () => {
        // Primero registramos un usuario
        const userData = {
            username: 'findme',
            password: 'password123',
            email: 'findme@example.com',
            role: UserRole.USER
        };

        const createRes = await request(app).post('/api/user').send(userData);

        const userId = createRes.body.data.id;

        // Ahora lo buscamos
        const response = await request(app).get(`/api/user/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.statusMsg).toBe('Success');
        expect(response.body.data.id).toBe(userId);
        expect(response.body.data.username).toBe(userData.username);
    });

    it('debería fallar al buscar un usuario que no existe', async () => {
        const fakeUuid = '00000000-0000-0000-0000-000000000000';
        const response = await request(app).get(`/api/user/${fakeUuid}`);

        expect(response.status).toBe(404);
        expect(response.body.statusMsg).toBe('Not Found');
    });
});
