
import jwt from 'jsonwebtoken';
import { Collection, MongoClient, ObjectId } from "mongodb";
import { env } from "../env";
import { IUser } from "../@types/IUser";
import { isValidEmail } from "../utils/validation";
import { EmailService } from './EmailService';

export class UserService {
  private client: MongoClient;
  private userDB: Collection;
  private emailService: EmailService;

  constructor() {
    this.client = new MongoClient(env.MONGO_URI, {
      forceServerObjectId: true,
    });
    this.client.connect();
    this.userDB = this.client.db(env.MONGO_DB).collection(env.MONGO_TABLE);
    this.emailService = new EmailService();
  }

  private async emailAlreadyExists(email: string) {
    const emailExists = await this.userDB.findOne({ email }).then(result => {
      return result;
    });
    return emailExists;
  }

  public async saveUser(user: IUser) {
    const isEmail = isValidEmail(user.email);
    if (!isEmail) {
      throw new Error('Email invalido!!!');
    }

    const existedEmail = await this.emailAlreadyExists(user.email);
    const token = jwt.sign({ email: user.email }, env.JWT_SECRET, { expiresIn: '1d' });

    if (!existedEmail) {
      await this.userDB.insertOne({
        email: user.email,
        token,
      });
    } else {
      await this.userDB.updateOne(
        { email: user.email },
        { $set: { token } }
      );
    }

    return await this.emailService.sendEmail(user.email, token);
  }

  public async findByEmail(email: string) {
    const findEmail = await this.userDB.findOne({ email });
    if (!findEmail) return null;
    return findEmail
  }
}