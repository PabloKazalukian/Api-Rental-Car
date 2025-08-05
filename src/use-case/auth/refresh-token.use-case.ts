import { JwtPayload } from "jsonwebtoken";
import { IUserService } from "../../interfaces/auth.interface";
import { UserEntity } from '../../entities/user.entity';


export class RefreshTokenUseCase {
    constructor(
        private readonly userService: IUserService
    ) { }

    async execute(user: JwtPayload | undefined): Promise<UserEntity | null> {


        if (user === undefined || user.sub === undefined) throw new Error('Token Invalido');
        // user as JwtPayload;
        // return 
        // if(!user?.sub) return this.httpResponse.Unauthorized(res, 'Token inválido');


        return await this.userService.findById(user.sub);
        // if(!foundUser) return this.httpResponse.Unauthorized(res, 'Usuario no encontrado');

    }
}