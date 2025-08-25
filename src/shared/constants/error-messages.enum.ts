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
    MISSING_PARAMETERS = 'Faltan parámetros requeridos',
    DATABASE_ERROR = 'Error al acceder a la base de datos',
    VALIDATION_ERROR = 'Error de validación en los datos',
    RESOURCE_NOT_FOUND = 'El recurso solicitado no existe',
    OPERATION_NOT_ALLOWED = 'Operación no permitida',
    INVALID_DATE = 'La fecha proporcionada no es válida',
    INVALID_NUMBER = 'El valor numérico no es válido',
    INVALID_UUID = 'El identificador no tiene un formato válido'

}

export enum DiscountErrorMessages {
    DISCOUNT_NOT_FOUND = 'El descuento no existe',
    CODE_ALREADY_EXISTS = 'El código de descuento ya está registrado',
    INVALID_DATE_RANGE = 'El rango de fechas no es válido',
    DISCOUNT_EXPIRED = 'El descuento ya venció',
    DISCOUNT_NOT_ACTIVE = 'El descuento no está activo',
    INVALID_TYPE = 'El tipo de descuento no es válido',
    INVALID_AMOUNT = 'El monto del descuento no es válido',
    INVALID_PERCENTAGE = 'El porcentaje del descuento no es válido',
    USER_NOT_ELIGIBLE = 'El usuario no cumple los requisitos para el descuento',
    REQUEST_ALREADY_LINKED = 'El descuento ya fue asignado a una solicitud'
}

export enum UserDiscountErrorMessages {
    INVALID_USER = 'El usuario no existe',
    INVALID_DISCOUNT = 'El descuento no existe o no es válido',
    ALREADY_ASSIGNED = 'El descuento ya está asignado al usuario',
    PAYMENT_ALREADY_LINKED = 'El descuento ya tiene un pago vinculado',
    PAYMENT_NOT_FOUND = 'El pago no existe',
    INVALID_STATUS = 'El estado del descuento de usuario no es válido',
    USER_DISCOUNT_NOT_FOUND = 'La relación usuario-descuento no existe',
    ASSIGNMENT_FAILED = 'No se pudo asignar el descuento al usuario',
    LINK_PAYMENT_FAILED = 'No se pudo vincular el pago al descuento de usuario'
}

export enum RequestErrorMessages {
    REQUEST_NOT_FOUND = 'La solicitud no fue encontrada',
    INVALID_DATE_RANGE = 'La fecha inicial no puede ser mayor a la final',
    INVALID_AMOUNT = 'El monto no es válido',
    CAR_NOT_AVAILABLE = 'El auto no está disponible en las fechas seleccionadas',
    USER_NOT_FOUND = 'El usuario no fue encontrado',
    CAR_NOT_FOUND = 'El auto no fue encontrado',
    STATE_INVALID = 'El estado de la solicitud no es válido',
    REQUEST_ALREADY_PROCESSED = 'La solicitud ya fue procesada'
}