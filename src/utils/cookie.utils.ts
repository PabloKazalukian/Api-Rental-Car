import { Response } from "express";


// export async function clearCookies(res: Response, names: string[]) {
//     for (const name of names) {
//         res.clearCookie(name, {
//             httpOnly: true,
//             sameSite: "strict",
//             secure: true,
//             path: "/",
//         });
//     }
// }

type CookieOptions = {
    secure?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    maxAge?: number;
    path?: string;
};
export function setAuthGoogleCookie(res: Response, token: string, options?: CookieOptions) {
    res.cookie("access_token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        ...options, // permite override si querés algo puntual
    });
}

export function setAuthCookie() {

}

export function setReedirectGoogleCookie(res: Response, redirectUri: string, options?: CookieOptions) {
    res.cookie('redirectUri', redirectUri, {
        maxAge: 5 * 60 * 1000,
        httpOnly: false, // solo se necesita para redirección del navegador
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
}

export function clearCookies(res: Response, names: string[]) {
    for (const name of names) {
        res.clearCookie(name, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: "/",
        });
    }
}