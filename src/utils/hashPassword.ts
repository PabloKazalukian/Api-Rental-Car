import { UserDTO } from "../dto/user.dto";
import bcryptjs from 'bcryptjs';

export async function hashPassword(pass: string): Promise<string> {

    if (pass !== null) {
        const salt = bcryptjs.genSaltSync(8);
        pass = bcryptjs.hashSync(pass, salt);
    }
    return pass;
}