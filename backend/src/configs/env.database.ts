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
      dialect: process.env.DB_DIALECT!,
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      name: process.env.DB_NAME!,
    },
  },
});
