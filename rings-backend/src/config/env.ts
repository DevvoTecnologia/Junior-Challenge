import 'dotenv/config';

const PORT = process.env.PORT!;
const MONGODB_URI = process.env.MONGODB_URI!;
const SECRET_KEY = process.env.SECRET!;

export const env = {
  port: PORT,
  mongodbUri: MONGODB_URI,
  secretKey: SECRET_KEY,
};
