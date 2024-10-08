import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly userService: UserService = new UserService()) { }

    async getUser(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser();
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = await this.userService.createUser(req.body);
            res.status(201).json(data)
        } catch (err) {
            console.log(err);
        }
    }
}