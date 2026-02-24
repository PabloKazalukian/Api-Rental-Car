import { Request, Response } from 'express';
import { hashPassword, isSamePassword } from '../../../utils/hashPassword';
import { instanceToPlain } from 'class-transformer';
import { IHttpResponse } from '../../../gateways/response/http-singleton.response';
import { IUserRepository } from '../../../../domain/interface/repositories/userRepository.interface';
import { IUserController } from '../../../../domain/interface/controllers/user-controller.interface';
import { User } from '../../../../domain/entities/user';

export class UserController implements IUserController {
    constructor(
        private readonly userService: IUserRepository, // ← Interfaz, no implementación
        private readonly httpResponse: IHttpResponse
    ) {}

    async getAllUser(req: Request, res: Response): Promise<Response> {
        try {
            const data: User[] = await this.userService.findAll();

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error all');
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const data: User | null = await this.userService.findById(req.params.idUser);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');

            return this.httpResponse.Ok(res, instanceToPlain(data));
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error al buscar por id');
        }
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userExist = await this.userService.findUserByEmail(req.body.email);

            if (userExist) return this.httpResponse.Error(res, 'El email ya está en uso');

            const userExistUsername = await this.userService.findUserByUsername(req.body.username);

            if (userExistUsername) return this.httpResponse.Error(res, 'El nombre de usuario ya está en uso');

            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error al crear un usuario');
        }
    }

    async verifyEmail(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.findUserByEmail(req.body.email);

            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            console.log(data);

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async verifyUsername(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.findUserByUsername(req.body.username);

            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async modifyPassword(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.findById(req.params.idUser);

            if (user) {
                const isSame = await isSamePassword(req.body.password, user.password);
                if (isSame) {
                    return this.httpResponse.Conflict(res, 'La nueva contraseña no puede ser igual a la anterior.');
                }
            }

            let pass = await hashPassword(req.body.password);

            if (user !== null) {
                user.password = pass;

                const data = await this.userService.update(req.params.idUser, user);
                if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
                return this.httpResponse.Ok(res, data);
            }
            return this.httpResponse.NotFound(res, 'Usuario no encontrado');
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async modifyUser(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.update(req.params.idUser, req.body);

            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.delete(req.params.idUser);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');

            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }
}
