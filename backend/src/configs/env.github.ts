interface EnvConfig {
  github: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
}

export default (): EnvConfig => ({
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackUrl: process.env.GITHUB_CALLBACK_URL!,
  },
});
