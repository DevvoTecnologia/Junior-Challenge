import ApiResponse from "../helpers/ApiResponseType";
import { Ring } from "../schemas/RingsModel";

import { Request, Response } from "express";
import RingService from "../services/RingService";

export default class RingController {
  static async GetRings(req: Request, res: Response) {
    const rings = await RingService.GetRings();

    if (!rings.success || !rings.data) {
      return res.status(500).json(
        new ApiResponse({
          success: false,
          message: "Internal server error getting rings",
        })
      );
    }

    return res.status(200).json(
      new ApiResponse<Ring[]>({
        success: true,
        message: "Rings retrieved successfully",
        data: rings.data,
      })
    );
  }

  static async GetRingById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Dados do anel inválidos, viajante.",
        })
      );
    }

    const ring = await RingService.GetRingById(id);

    if (!ring.success || !ring.data) {
      return res.status(500).json(ring);
    }

    return res.status(200).json(ring);
  }

  static async CreateRing(req: Request, res: Response) {
    const body: Ring = req.body;

    if (!body) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Informações do anel inválidas, viajante.",
        })
      );
    }

    if (!body.nome || !body.forjadoPor || !body.poder || !body.portador) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Por favor, preencha todos os campos obrigatórios",
        })
      );
    }

    const ringExists = await RingService.GetRingByName(body.nome);

    if (ringExists.success) {
      return ringExists;
    }

    const response = await RingService.CreateRing(body);

    if (!response.success || !response.data) {
      return response;
    }

    return res.status(200).json(response);
  }

  static async EditRing(req: Request, res: Response) {
    const body: Ring = req.body;
    const { id } = req.params;

    if (!body || !id) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Dados do anel inválidos, viajante.",
        })
      );
    }

    if (body.nome === "" || body.poder === "" || body.portador === "") {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message:
            "Por favor, preencha todos os campos obrigatórios, viajante.",
        })
      );
    }

    const ringExists = await RingService.GetRingById(id);

    if (!ringExists.success || !ringExists.data) {
      return ringExists;
    }

    const response = await RingService.UpdateRing(body, id);

    if (!response.success || !response.data) {
      return response;
    }

    return res.status(200).json(response);
  }

  static async DeleteRing(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json(
        new ApiResponse({
          success: false,
          message: "Informações do anel inválidas, viajante.",
        })
      );
    }

    const ringExists = await RingService.GetRingById(id);
    if (!ringExists.success || !ringExists.data) {
      return res.status(400).json(ringExists);
    }

    const response = await RingService.DeleteRing(id);

    if (!response.success) {
      return res.status(500).json(response);
    }

    return res.status(200).json(response);
  }
}
