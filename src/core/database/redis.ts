import redis from "redis";
import get from "../config/config";

const env = get.app.environment;
const host = get.redis.host;
const port = get.redis.port;
const password = get.redis.password;
const database = get.redis.database;

const url = `redis://${host}:${port}/${database}`;

const client =
  env === "production"
    ? redis.createClient({
        url: url,
        password: password,
        database: database,
        socket: {
          tls: true,
          rejectUnauthorized: false,
        },
      })
    : redis.createClient({
        url: url,
        password: password,
        database: database,
      });

export default client;
