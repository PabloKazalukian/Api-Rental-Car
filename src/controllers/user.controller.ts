import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from '../shared/http.response';
import { UserEntity } from "../entities/user.entity";

export class UserController {
    constructor(private readonly userService: UserService = new UserService(), private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    async getAllUser(req: Request, res: Response): Promise<Response> {
        try {
            const data: UserEntity[] = await this.userService.findAllUser();
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const data: UserEntity | null = await this.userService.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            // console.log(req.body);
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async verifyEmail(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.findById(req.params.id);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            // TODO: Implementar el envío de correo electrónico
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async modifyPassword(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.findById(req.params.idUser);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            // TODO: Implementar el cambio de contraseña
            return this.httpResponse.Ok(res, data);

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async modifyUser(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.updateUser(req.params.idUser, req.body);
            if (!data.affected) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            return this.httpResponse.Ok(res, data);

        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };
}