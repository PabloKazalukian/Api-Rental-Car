export enum AuthErrorMessages {
    INVALID_CREDENTIALS = 'Credenciales inválidas',
    USER_NOT_FOUND = 'Usuario no encontrado',
    TOKEN_INVALID = 'Token inválido',
    GOOGLE_USER_ERROR = 'Error al procesar el usuario de Google',
    PERMISSION_DENIED = 'No tenés permisos para esta acción'
}

// Podés tener más enums por módulo
export enum UserErrorMessages {
    EMAIL_ALREADY_EXISTS = 'El correo ya está registrado',
    USERNAME_ALREADY_EXISTS = 'El nombre de usuario ya existe',
    USER_NOT_FOUND = 'El usuario no fue encontrado'
}

export enum CommonErrorMessages {
    UNKNOWN_ERROR = 'Ocurrió un error inesperado',
    INVALID_INPUT = 'Datos inválidos',
    MISSING_PARAMETERS = 'Faltan parámetros requeridos'
}
