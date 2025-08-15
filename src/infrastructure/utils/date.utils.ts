/**
 * Devuelve la cantidad de días (incluyendo días parciales como completos)
 * entre dos fechas.
 */
export function getDays(start: Date | string, end: Date | string): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    if (typeof end === 'string' || typeof start === 'string') {
        end = new Date(end);
        start = new Date(start);
    }

    const diff = end.getTime() - start.getTime();

    if (diff < 0) {
        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    return Math.ceil(diff / msPerDay);
}
