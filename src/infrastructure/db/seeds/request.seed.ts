import { UserDTO } from "../../../application/dtos/user.dto";
import { RequestRepository } from "../../gateways/repositories/request.repository";
import { UserRepository } from "../../gateways/repositories/user.repository";
import { RequestDTO, } from "../../../application/dtos/request.dto";
import { CarRepository } from "../../gateways/repositories/car.repository";
import { StateCar } from "../../../domain/entities/request";
import { UserEntity } from "../entities/user.entity";
import { UserRole, UserType } from "../../../domain/entities/user";

export class RequestSeeder {
    private userService = new UserRepository();
    private requestService = new RequestRepository();
    private carService = new CarRepository();

    async run() {
        // 1. Verificar si el usuario ya existe
        const existing = await this.userService.findUserByEmail('user@user.com');
        if (existing) {
            console.log('User already exists');
            return;
        }

        // 2. Crear usuario dummy
        const user = new UserDTO();
        user.username = 'user';
        user.email = 'user@user.com';
        user.password = '12345678';
        user.role = UserRole.USER;
        user.type = UserType.LOCAL;

        const usuarito = await this.userService.createUser(user);
        console.log(usuarito)

        // 3. Buscar el usuario recién creado (para obtener ID y tipo entidad)
        const createdUser = await this.userService.findUserByEmail(user.email);
        if (!createdUser) {
            console.error("❌ No se pudo recuperar el usuario creado.");
            return;
        }

        // 4. Buscar el primer auto disponible
        const cars = await this.carService.findAllCar();
        if (!cars || cars.length === 0) {
            console.error("❌ No hay autos disponibles para crear la request.");
            return;
        }

        const car = cars[0];

        // 5. Crear RequestDTO con los datos
        const request = new RequestDTO();
        request.amount = 1000;
        request.initialDate = new Date("2025-08-10");
        request.finalDate = new Date("2025-08-15");
        request.state = StateCar.REQUEST;
        request.user_id = createdUser as UserEntity;
        request.car_id = car;

        // 6. Guardar request
        await this.requestService.createRequest(request);
        console.log("✅ Request creada correctamente para el usuario 'user@user.com'");
    }
}
