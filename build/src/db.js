"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dbKeys_1 = __importDefault(require("./keys/dbKeys"));
const pool = mysql_1.default.createPool(dbKeys_1.default.database);
pool.getConnection(function () {
    console.log('dB is connected ');
});
