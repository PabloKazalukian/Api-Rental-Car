import { Router } from "express";

export class Routes<T> {
    public router: Router;
    public controller: T;

    constructor(Tcontroller: { new(): T }) {
        this.router = Router();
        this.controller = new Tcontroller();
        // this.initializeRoutes();
        this.routes();
    }

    routes() { }
}