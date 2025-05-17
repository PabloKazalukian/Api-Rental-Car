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

            const userExist = await this.userService.findUserByEmail(req.body.email);
            if (userExist) return this.httpResponse.Error(res, 'El email ya está en uso');
            const userExistUsername = await this.userService.findUserByUsername(req.body.username);
            if (userExistUsername) return this.httpResponse.Error(res, 'El nombre de usuario ya está en uso');

            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Created(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

    async verifyEmail(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.findUserByEmail(req.body.email);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            return this.httpResponse.Ok(res, data);
        } catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }
    };

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
            const data = await this.userService.findById(req.params.idUser);
            if (!data) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
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

    async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.userService.deleteUser(req.params.idUser);
            if (!data.affected) return this.httpResponse.NotFound(res, 'Usuario no encontrado');
            return this.httpResponse.Ok(res, data);
        }
        catch (err) {
            return this.httpResponse.Error(res, 'Ocurrio un error');
        }

    }
}