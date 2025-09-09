import { HttpException } from '../../../shared/exeptions/http.exeption';
import { AuthErrorMessages } from '../../../shared/constants/error-messages.enum';
import { HttpStatus } from '../../../shared/constants/http-status.enum';
import { IAuthService } from '../../../domain/interface/repositories/auth.interface';
import { User } from '../../../domain/entities/user';
import { UserMapper } from '../../mappers/user.mappers';
import { UserEntity } from '../../../infrastructure/db/entities/user.entity';
import { getIO } from '../../../infrastructure/config/socket';

export class LoginUseCase {
    constructor(private readonly authService: IAuthService) {}

    async execute(user: User | undefined): Promise<{ accessToken: string; user: UserEntity }> {
        if (user === undefined) throw new HttpException(HttpStatus.UNAUTHORIZED, AuthErrorMessages.TOKEN_INVALID);
        const userEntity: UserEntity = UserMapper.toPersistence(user);

        const io = getIO();
        io.to(userEntity.id).emit('login:success', 'Te logueaste con exito✅');

        return this.authService.generateJWT(userEntity);
    }
}
