import postgres from "postgres";
import config from "../config/config";

const env = config.app.environment;
const host = config.postgres.host;
const port = config.postgres.port;
const username = config.postgres.username;
const password = config.postgres.password;
const database = config.postgres.database;

const url = `postgres://${username}:${password}@${host}:${port}/${database}`;

const sql =
  env === "production"
    ? postgres(url, {
        host: host,
        port: port,
        database: database,
        username: username,
        password: password,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : postgres(url, {
        host: host,
        port: port,
        database: database,
        username: username,
        password: password,
      });

export default sql;
