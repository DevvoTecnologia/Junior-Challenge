interface EnvConfig {
  token: {
    secret: string;
    expiration: string;
  };

  queryParams: {
    secret: string;
    algorithm: string;
    ivSize: number;
  };
}

export default (): EnvConfig => ({
  token: {
    secret: process.env.TOKEN_SECRET!,
    expiration: process.env.TOKEN_EXPIRATION ?? "1d",
  },

  queryParams: {
    secret: process.env.QUERYPARAMS_OAUTH_PRIVATE_KEY!,
    algorithm: process.env.QUERYPARAMS_OAUTH_ALGORITHM!,
    ivSize: parseInt(process.env.QUERYPARAMS_OAUTH_IV_SIZE!),
  },
});
