interface EnvConfig {
  nodeEnv: string;

  allowedOrigin: string;

  host: string;
  port: number;
  imagesUrl: string;

  github: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };

  token: {
    secret?: string;
    expiration: string;
  };
}

export default (): EnvConfig => ({
  nodeEnv: "test",

  allowedOrigin: "http://localhost:3001",

  host: "http://localhost",
  port: 3000,
  imagesUrl: "http://localhost:3000/uploads",

  github: {
    clientId: "github-client-id",
    clientSecret: "github-client-secret",
    callbackUrl: "http://localhost:3000/auth/github/callback",
  },

  token: {
    secret: "test",
    expiration: "1d",
  },
});
