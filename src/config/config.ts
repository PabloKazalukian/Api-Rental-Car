import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.DB_HOST || 'localhost';
const MYSQL_DATABASE = process.env.DB_DATABASE || 'rental_car_db';
const MYSQL_USER = process.env.DB_USER || 'root'
const MYSQL_PASS = process.env.DB_PASSWORD || 'MyMatute';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 3001;

console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
console.log(process.env.PORT ,process.env.PORT ,process.env.PORT ,process.env.PORT )
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const AUTH_JWT = process.env.AUTH_JWT || 'SECRETO';

const AUTH = {
    key : AUTH_JWT,
    expires: '24h'
}

const config = {
    mysql: MYSQL,
    server: SERVER,
    auth: AUTH
};

export default config;