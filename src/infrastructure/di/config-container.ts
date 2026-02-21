// infrastructure/di/container-config.ts
import { IUserController } from '../../domain/interface/controllers/user-controller.interface';
import { IAuthService } from '../../domain/interface/repositories/auth.interface';
import { IUserRepository } from '../../domain/interface/repositories/userRepository.interface';
import { IEmailProvider, IEmailRepository } from '../gateways/email/IEamilProvider';
import { ResendEmailProvider } from '../gateways/email/resend.provider';
import { AuthService } from '../gateways/repositories/auth.service';
import { EmailRepository } from '../gateways/repositories/email.repository';
import { UserRepository } from '../gateways/repositories/user.repository';
import { IHttpResponse } from '../gateways/response/http-singleton.response';
import { HttpResponse } from '../gateways/response/http.response';
import { UserController } from '../interfaces/http/controllers/user.controller';
import { Container } from './container';

export function configureContainer() {
    // ===== REPOSITORIOS =====
    Container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);

    // ===== SERVICIOS =====
    Container.registerSingleton<IAuthService>('IAuthService', AuthService);
    Container.register<IEmailProvider>('IEmailProvider', ResendEmailProvider);
    Container.registerSingleton<IEmailRepository>('IEmailRepository', EmailRepository);

    // ===== UTILS =====
    Container.registerSingleton<IHttpResponse>('IHttpResponse', HttpResponse);

    Container.registerFactory<IUserController>('IUserController', () => {
        const userRepository = Container.resolve<IUserRepository>('IUserRepository');
        const httpResponse = Container.resolve<IHttpResponse>('IHttpResponse');
        return new UserController(userRepository, httpResponse);
    });
}
// main.ts o index.ts
configureContainer();
