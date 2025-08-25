import { Response } from "express";

type CookieOptions = {
    secure?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    maxAge?: number;
    path?: string;
};

export function setAuthGoogleCookie(res: Response, token: string, options?: CookieOptions) {
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        ...options, // permite override si querés algo puntual
    });
};

export function setAuthCookie(res: Response, token: string, options?: CookieOptions) {
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        ...options, // permite override si querés algo puntual

    });
};

export function setReedirectGoogleCookie(res: Response, redirectUri: string, options?: CookieOptions) {
    res.cookie('redirectUri', redirectUri, {
        httpOnly: false, // solo se necesita para redirección del navegador
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...options, // permite override si querés algo puntual
    });
};

export function clearCookies(res: Response, names: string[]) {
    for (const name of names) {
        res.clearCookie(name, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: "/",
        });
    };
};