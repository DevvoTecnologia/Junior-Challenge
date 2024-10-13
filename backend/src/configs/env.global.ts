interface EnvConfig {
  nodeEnv: string;

  allowedOrigin: string;

  host: string;
  port: number;
  imagesUrl: string;
}

export default (): EnvConfig => ({
  nodeEnv: process.env.NODE_ENV ?? "production",

  allowedOrigin: process.env.ALLOWED_ORIGIN ?? "http://localhost:3001",

  host: process.env.HOST ?? "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  imagesUrl: process.env.IMAGES_URL ?? "http://localhost:3000/uploads",
});
