interface EnvConfig {
  token: {
    secret: string;
    expiration: string;
  };

  queryParams: {
    secret: string;
  };
}

export default (): EnvConfig => ({
  token: {
    secret: process.env.TOKEN_SECRET!,
    expiration: process.env.TOKEN_EXPIRATION ?? "1d",
  },

  queryParams: {
    secret: process.env.QUERYPARAMS_OAUTH_PRIVATE_KEY!,
  },
});
