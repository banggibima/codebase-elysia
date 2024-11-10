import value from "../utils/value";

interface App {
  name: string;
  port: number;
  version: string;
  environment: string;
}

interface JWT {
  secret: string;
  expires_in: number;
}

interface Postgres {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface Redis {
  host: string;
  port: number;
  password: string;
  database: number;
}

interface Environment {
  app: App;
  jwt: JWT;
  postgres: Postgres;
  redis: Redis;
}

const config: Environment = {
  app: {
    name: value.asString(Bun.env.APP_NAME, "codebase-elysia"),
    port: value.asNumber(Bun.env.APP_PORT, 3000),
    version: value.asString(Bun.env.APP_VERSION, "1.0.0"),
    environment: value.asString(Bun.env.APP_ENV, "development"),
  },
  jwt: {
    secret: value.asString(Bun.env.JWT_SECRET, "your-secret-whatever"),
    expires_in: value.asNumber(Bun.env.JWT_EXPIRES_IN, 3600),
  },
  postgres: {
    host: value.asString(Bun.env.POSTGRES_HOST, "localhost"),
    port: value.asNumber(Bun.env.POSTGRES_PORT, 5432),
    username: value.asString(Bun.env.POSTGRES_USERNAME, "postgres"),
    password: value.asString(Bun.env.POSTGRES_PASSWORD, "password"),
    database: value.asString(Bun.env.POSTGRES_DATABASE, "codebase_elysia"),
  },
  redis: {
    host: value.asString(Bun.env.REDIS_HOST, "localhost"),
    port: value.asNumber(Bun.env.REDIS_PORT, 6379),
    password: value.asString(Bun.env.REDIS_PASSWORD, "password"),
    database: value.asNumber(Bun.env.REDIS_DATABASE, 0),
  },
};

export default config;
