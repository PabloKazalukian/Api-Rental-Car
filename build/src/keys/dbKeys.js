"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "MyMatute",
        database: process.env.DB_DATABASE || "rental_car_db"
    }
};
