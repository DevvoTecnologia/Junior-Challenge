import { Request, Response } from "express";
import { Rings } from "../../../models/rings";
import { errorInRequest } from "../../../utils";
import { validateForgerCapacity } from "../../../services/validation";

interface IPropsRingsUpdate {
  name?: string;
  power?: string;
  owner?: string;
  forgedBy?: string;
  imagem?: string;
}

export class RingsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, power, owner, forgedBy, imagem } = req.body;

    try {
      const isValid = await validateForgerCapacity(forgedBy);

      if (!isValid) {
        return res.status(400).json({
          error: {
            status: 400,
            message: "Forger has reached the maximum number of rings",
          },
        });
      }

      const rings = await Rings.create({
        name,
        power,
        owner,
        imagem,
        ForgerId: forgedBy,
      });

      return res.status(201).json({
        data: {
          rings,
        },
      });
    } catch (error) {
      console.log("error", error);

      if (error === "Error: Forger not found")
        return res.status(404).json({
          error: {
            status: 404,
            message: "Forger not found",
          },
        });

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  public async listAll(_req: Request, res: Response): Promise<Response> {
    try {
      const rings = await Rings.findAll();

      return res.status(201).json({
        data: {
          rings,
        },
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, power, owner, forgedBy, imagem } = req.body;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rings: any = (await Rings.findByPk(id)) as IPropsRingsUpdate;

      if (forgedBy && rings.ForgerId !== forgedBy) {
        const isValid = await validateForgerCapacity(forgedBy);

        if (!isValid) {
          return res.status(400).json({
            error: {
              status: 400,
              message: "Forger has reached the maximum number of rings",
            },
          });
        }
      }

      if (rings) {
        Rings.update(
          {
            name: name ?? rings?.name,
            power: power ?? rings?.power,
            owner: owner ?? rings?.owner,
            ForgerId: forgedBy ?? rings?.forgedBy,
            imagem: imagem ?? rings?.imagem,
          },
          {
            where: {
              id,
            },
          }
        );

        return res.status(201).send();
      } else {
        return res.status(404).json({
          error: {
            status: 404,
            message: "Not found",
          },
        });
      }
    } catch (error) {
      console.log("error", error);

      if (error === "Forger not found")
        return res.status(404).json({
          error: {
            status: 404,
            message: "Forger not found",
          },
        });

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) return errorInRequest(res, 400, "The ID entered is invalid");

    try {
      await Rings.destroy({
        where: {
          id,
        },
      });
      return res.status(201).send();
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        error: {
          status: 500,
          message: "Internal Server Error",
        },
      });
    }
  }
}
