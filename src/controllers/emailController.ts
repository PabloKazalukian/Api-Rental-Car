import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();


const contact = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, name, comment } = req.body;



        const sgMail = require('@sendgrid/mail');


        sgMail.setApiKey(process.env.API_KEY);

        const message = {
            to: "kazalukianpablo@gmail.com",
            from: "pablokazadev@gmail.com",
            subject: `Comentario desde Rental-Car!`,
            html: `<html>
        <head>
        <body>
        <h2> Nombre: ${name}</h2> 
        <h2> email: ${email}</h2>
        <h4>Comentario:</h4>
        <div>${comment}</div>
        </body>
        </head>
        </html>`,
        };
        res.json({})

        sgMail
            .send(message)
            .then((response: any) => console.log('Email sent...'))
            .catch((error: any) => console.log(error.message))
    } catch (error) {
        console.log(error)
    }
}

export default { contact };
