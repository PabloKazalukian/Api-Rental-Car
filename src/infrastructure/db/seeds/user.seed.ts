import { UserDTO } from "../../../application/dtos/user.dto";
import { UserRole } from "../../../domain/entities/user";
import { UserRepository } from "../../gateways/repositories/user.repository";

export class UserSeeder {
    private userService = new UserRepository();

    async run() {
        const existing = await this.userService.findUserByEmail('admin@admin.com');
        if (existing) {
            console.log('Admin user already exists');
            return;
        }

        const adminUser = new UserDTO();
        adminUser.username = 'admin';
        adminUser.email = 'admin@admin.com';
        adminUser.password = '12345678';
        adminUser.role = UserRole.ADMIN;


        await this.userService.createUser(adminUser);

        console.log('Admin user seeded');
    }

}