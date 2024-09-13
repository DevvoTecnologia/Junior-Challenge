import { Request, Response } from "express";
import { Users } from "../../../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    if (!password?.length || !email?.length)
      return res.status(401).json({
        error: {
          status: 400,
          message: "Bad Request",
        },
      });

    try {
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (user)
        return res.status(401).json({
          error: {
            status: 400,
            message: "Bad Request",
          },
        });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await Users.create({
        email,
        password: hash,
      });

      return res.status(201).send();
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = await Users.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({
          error: {
            status: 401,
            message: "Unauthorized",
          },
        });
      }

      const correct = bcrypt.compareSync(password, user.password);

      if (correct) {
        return new Promise<Response>((resolve, reject) => {
          jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "8h" },
            (error, token) => {
              if (error) {
                return reject(
                  res.status(500).json({
                    error: {
                      status: 500,
                      message: "Internal Server Error",
                    },
                  })
                );
              }

              return resolve(
                res.status(200).json({
                  data: {
                    token,
                  },
                })
              );
            }
          );
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: "Unauthorized",
          },
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
