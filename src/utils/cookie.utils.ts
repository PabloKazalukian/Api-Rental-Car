import { Response } from "express";


export async function clearCookies(res: Response, names: string[]) {
    for (const name of names) {
        res.clearCookie(name, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            path: "/",
        });
    }
}