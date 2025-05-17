import { UserDTO, UserRole } from "../dto/user.dto";
import { UserService } from "../services/user.service";

export class UserSeeder {
    private userService = new UserService();

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