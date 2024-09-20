﻿import { Request, Response } from "express";
import { User } from "../schemas/UsersModel";
import AuthService from "../services/AuthService";
import TokenHelper from "../helpers/TokenHelper";

interface iLoggedUser {
  email: string;
  token: string;
}

export default class AuthController {
  static async Authenticate(req: Request, res: Response) {
    const { email, password }: User = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const response = await AuthService.Authenticate({ email, password });

    if (!response.success) {
      return res.status(401).json(response);
    }

    // GEN JWT
    const jwt = TokenHelper.GenerateToken({ email });

    const data: iLoggedUser = {
      email,
      token: jwt,
    };

    return res.status(200).json({
      ...response,
      data,
    });
  }

  static async CreateAccount(req: Request, res: Response) {
    const { email, password }: User = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Dados inválidos, viajante.",
      });
    }

    const response = await AuthService.CreateAccount({ email, password });

    if (!response.success) {
      return res.status(400).json(response);
    }

    const jwt = TokenHelper.GenerateToken({ email });
    const data: iLoggedUser = {
      email,
      token: jwt,
    };

    return res.status(201).json({ ...response, data });
  }
}