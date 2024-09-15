import { Request, Response } from "express";

import { UserServices } from "../services/user-services";
export class UserController {
  constructor(private readonly userService = new UserServices()) {}
  async executeCreate(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await this.userService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      return res.status(500).json({ error: _error.message });
    }
  }

  async executeLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      return res.status(500).json({ error: _error.message });
    }
  }

  async executeFindByToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
      const user = await this.userService.findByToken(token);
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      return res.status(500).json({ error: _error.message });
    }
  }
}
