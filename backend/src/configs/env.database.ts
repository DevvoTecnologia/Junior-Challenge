interface Database {
  dialect: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

type MysqlDatabase = Database;

interface EnvConfig {
  database: {
    mysql: MysqlDatabase;
  };
}

export default (): EnvConfig => ({
  database: {
    mysql: {
      dialect: process.env.DB_DIALECT ?? "mysql",
      host: process.env.DB_HOST ?? "localhost",
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME ?? "root",
      password: process.env.DB_PASSWORD ?? "toor",
      name: process.env.DB_NAME ?? "ringdb",
    },
  },
});
