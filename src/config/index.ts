import dotenv from 'dotenv';

dotenv.config({ path: 'src/config/.env' });

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD = '',
  DB_PORT,
  DB_NAME,
  SERVER_PROTOCOL,
  SERVER_DOMAIN,
  SERVER_PORT,
} = process.env;

if (
  DB_HOST === undefined
  || DB_USER === undefined
  || DB_PASSWORD === undefined
  || DB_PORT === undefined
  || DB_NAME === undefined
  || SERVER_PROTOCOL === undefined
  || SERVER_DOMAIN === undefined
  || SERVER_PORT === undefined
) {
  throw new Error('Please fill "/src/config/.env" file');
}

const isValidPort = (port: number) => !Number.isNaN(port) && port >= 0 && port <= 65000;

const dbPort = Number(DB_PORT);
if (!isValidPort(dbPort)) {
  throw new Error('Error in "/src/config/.env" file.\n DB_PORT in invalid.');
}

const serverPort = Number(SERVER_PORT);
if (!isValidPort(serverPort)) {
  throw new Error('Error in "/src/config/.env" file.\n SERVER_PORT in invalid.');
}

const server = {
  protocol: SERVER_PROTOCOL,
  domain: SERVER_DOMAIN,
  port: SERVER_PORT,
  url: `${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`,
};

const database = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: dbPort,
  database: DB_NAME,
};

const config = {
  server,
  database,
};

export default config;
