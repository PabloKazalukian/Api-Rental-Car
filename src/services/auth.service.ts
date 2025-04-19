import { ConfigServer } from "../config/config";
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { UserEntity } from "../entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

/**
 * Servicio de autenticación que maneja validación de usuarios y generación de tokens JWT.
 */
export class AuthService extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }

    /**
     * Valida si un usuario existe y si su contraseña es correcta.
     * Puede recibir como identificador un nombre de usuario o un correo electrónico.
     */
    public async validateUser(identifier: string, plainPassword: string): Promise<UserEntity | null> {
        // Buscar usuario por nombre de usuario
        const userByUsername: UserEntity | null = await this.userService.findUserByUsername(identifier);

        // Buscar usuario por email
        const userByEmail: UserEntity | null = await this.userService.findUserByEmail(identifier);

        // Validar contraseña si se encontró usuario por nombre de usuario
        if (userByUsername) {
            const passwordMatches = await bcryptjs.compare(plainPassword, userByUsername.password);
            if (passwordMatches) {
                return userByUsername;
            }
        }

        // Validar contraseña si se encontró usuario por email
        if (userByEmail) {
            const passwordMatches = await bcryptjs.compare(plainPassword, userByEmail.password);
            if (passwordMatches) {
                return userByEmail;
            }
        }

        // Retorna null si no se encontró un usuario válido
        return null;
    }

    /**
     * Firma un payload para generar un token JWT con una duración de 24 horas.
     */
    private signToken(payload: jwt.JwtPayload, secretKey: any): string {
        return this.jwtInstance.sign(payload, secretKey, { expiresIn: '24h' });
    }

    /**
     * Genera un JWT para el usuario autenticado e incluye sus datos (sin contraseña).
     */
    public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
        // Obtener datos del usuario junto con su rol
        const userWithRole = await this.userService.findUserWithRole(user.id, user.role);

        // Preparar el payload del token
        const payload: PayloadToken = {
            role: userWithRole!.role,
            sub: userWithRole!.id,
            username: userWithRole!.username
        };

        // Ocultar la contraseña del usuario en el objeto de respuesta
        if (userWithRole) {
            user.password = "No access"; // Otra opción sería eliminar directamente el campo
        }

        // Retornar token de acceso y datos del usuario
        return {
            accessToken: this.signToken(payload, this.getEnvironment('AUTH_JWT') || 'defaultSecretKey'),
            user
        };
    }
}