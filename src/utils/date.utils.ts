/**
 * Devuelve la cantidad de días (incluyendo días parciales como completos)
 * entre dos fechas.
 */
export function getDays(start: Date, end: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = end.getTime() - start.getTime();

    if (diff < 0) {
        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    return Math.ceil(diff / msPerDay);
}
