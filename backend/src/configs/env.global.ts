interface EnvConfig {
  nodeEnv: string;

  allowedOrigin: string;

  database: {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  host: string;
  port: number;

  token: {
    secret?: string;
    expiration: string;
  };
}

export default (): EnvConfig => ({
  nodeEnv: process.env.NODE_ENV || "development",

  allowedOrigin: process.env.ALLOWED_ORIGIN || "http://192.168.100.3:3001",

  host: process.env.HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  database: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "toor",
    name: process.env.DB_NAME || "ringdb",
  },

  token: {
    secret: process.env.TOKEN_SECRET,
    expiration: process.env.TOKEN_EXPIRATION || "1d",
  },
});
