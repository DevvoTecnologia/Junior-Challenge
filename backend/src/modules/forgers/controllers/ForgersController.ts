import { Request, Response } from "express";
import { Forgers } from "../../../models/forgers";

export class ForgersController {
  public async listAll(_req: Request, res: Response): Promise<Response> {
    const forgers = await Forgers.findAll();

    return res.status(201).json({
      data: {
        forgers,
        statusCode: 201,
      },
    });
  }
}
