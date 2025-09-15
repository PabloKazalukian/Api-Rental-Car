import { UserDTO } from '../../../application/dtos/user.dto';
import { User, UserRole, UserType } from '../../../domain/entities/user';
import { UserRepository } from '../../gateways/repositories/user.repository';

export class UserSeeder {
    private userService = new UserRepository();

    async run() {
        const existing = await this.userService.findUserByEmail('admin@admin.com');
        if (existing) {
            console.log('Admin user already exists');
            return;
        }

        const adminUser = new User(
            '123e4567-e89b-12d3-a456-426614174000',
            'admin',
            'admin@admin.com',
            '12345678',
            UserRole.ADMIN,
            UserType.LOCAL
        );

        await this.userService.createUser(adminUser);

        console.log('Admin user seeded');
    }
}
