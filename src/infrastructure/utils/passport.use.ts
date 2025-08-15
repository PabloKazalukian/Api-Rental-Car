
/**
 * Registra una estrategia personalizada en Passport.
 * 
 * @template T - Tipo de la estrategia (extiende de `passport.Strategy`)
 * @template U - Tipo del objeto de configuración para la estrategia
 * @template X - Tipo del callback que se ejecuta al autenticar
 * @param name - Nombre de la estrategia (ej: 'google')
 * @param Strategy - Clase de la estrategia (ej: GoogleStrategy)
 * @param params - Configuración necesaria para la estrategia
 * @param callback - Función que maneja la autenticación
 */

import passport, { Strategy } from 'passport';

type TypeStrategy<T, U, X> = { new(params: U, callback: X): T };

export function PassportUse<T extends Strategy, U, X>(
    name: string,
    Strategy: TypeStrategy<T, U, X>,
    params: U,
    callback: X) {

    passport.use(name, new Strategy(params, callback));

}