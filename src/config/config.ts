import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_HOST)
const MYSQL_HOST = process.env.DB_HOST;
const MYSQL_DATABASE = process.env.DB_DATABASE;
const MYSQL_USER = process.env.DB_USER;
const MYSQL_PASS = process.env.DB_PASSWORD;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.PORT || 3001;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const AUTH_JWT = process.env.AUTH_JWT || "SECRETO";

const AUTH = {
  key: AUTH_JWT,
  expires: "24h",
};

const config = {
  mysql: MYSQL,
  server: SERVER,
  auth: AUTH,
};

export default config;
