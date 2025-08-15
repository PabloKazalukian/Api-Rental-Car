import { Router } from "express";

export abstract class Routes<T, U> {
    public router: Router;
    protected controller: T;
    protected middleware: U;

    constructor(controller: T, middleware: U) {
        this.router = Router();
        this.controller = controller;
        this.middleware = middleware;
        this.routes();
    }

    protected abstract routes(): void;
}
