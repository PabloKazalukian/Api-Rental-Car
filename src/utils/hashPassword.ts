import bcryptjs from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {

    console.log('pasiencia', password, typeof password !== 'string')
    if (typeof password !== 'string' || password.trim() === '') {
        throw new Error('Invalid password: must be a non-empty string');
    }

    try {
        const salt = await bcryptjs.genSalt(8);
        return await bcryptjs.hash(password, salt);
    } catch (err) {
        // Podés lanzar directamente o crear un error más claro
        throw new Error(`Password hashing failed: ${(err as Error).message}`);
    }
}

export async function isSamePassword(newPassword: string, oldPassword: string): Promise<boolean> {
    const isSame = await bcryptjs.compare(newPassword, oldPassword);
    console.log(newPassword, oldPassword);

    return isSame;
}