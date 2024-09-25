interface EnvConfig {
  nodeEnv: string;

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

  tokenSecret?: string;
}

export default (): EnvConfig => ({
  nodeEnv: process.env.NODE_ENV || "development",

  database: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "toor",
    name: process.env.DB_NAME || "ringdb",
  },

  host: process.env.HOST || "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  tokenSecret: process.env.TOKEN_SECRET,
});
