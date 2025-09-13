import { JwtPayload } from 'jsonwebtoken';
import { HttpException } from '../../../shared/exeptions/http.exeption';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { AuthErrorMessages } from '../../../shared/constants/error-messages.enum';
import { IUserService } from '../../../domain/interface/repositories/auth.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { User } from '../../../domain/entities/user';

export class RefreshTokenUseCase {
    constructor(private readonly userService: IUserService) {}

    async execute(user: JwtPayload | undefined): Promise<User> {
        if (user === undefined || user.sub === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.TOKEN_INVALID);
        const userEntity = await this.userService.findById(user.sub);

        if (userEntity === null) throw new HttpException(HttpStatus.BAD_REQUEST, AuthErrorMessages.USER_NOT_FOUND);

        return UserMapper.toDomain(userEntity);
    }
}
