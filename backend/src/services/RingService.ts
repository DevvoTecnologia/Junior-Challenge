import { ObjectId, startSession } from "mongoose";
import ApiResponse from "../helpers/ApiResponseType";
import RingModel, { Ring } from "../schemas/RingsModel";

export default class RingService {
  static async GetRings(): Promise<ApiResponse<Ring[] | null>> {
    try {
      const rings = await RingModel.find();
      return new ApiResponse<Ring[]>({
        success: true,
        message:
          "Anéis recuperados com sucesso, viajante! Que eles lhe tragam sabedoria em sua jornada.",
        data: rings,
      });
    } catch (err) {
      console.log(err);
      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    }
  }

  static async GetRingById(ringId: string): Promise<ApiResponse<Ring | null>> {
    try {
      const ring = await RingModel.findById(ringId);

      if (!ring) {
        return new ApiResponse({
          success: false,
          message:
            "Anel não encontrado, viajante. Parece que ele se perdeu nas brumas do tempo.",
        });
      }

      return new ApiResponse<Ring>({
        success: true,
        message:
          "Anel recuperado com sucesso, viajante! Que ele lhe traga sabedoria em sua jornada.",
        data: ring,
      });
    } catch (error) {
      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    }
  }

  static async GetRingByName(ringName: string): Promise<ApiResponse<Ring>> {
    try {
      const ring = await RingModel.findOne({ nome: ringName });

      if (!ring) {
        return new ApiResponse({
          success: false,
          message:
            "Anel não encontrado, viajante. Parece que ele se perdeu nas brumas do tempo",
        });
      }

      return new ApiResponse<Ring>({
        success: true,
        message:
          "Anel recuperado com sucesso, viajante! Que ele lhe traga sabedoria em sua jornada",
        data: ring,
      });
    } catch (err) {
      console.log(err);
      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    }
  }

  static async CreateRing(body: Ring): Promise<ApiResponse<Ring | null>> {
    const race = body.forjadoPor;

    const session = await startSession();
    session.startTransaction();

    try {
      const countRingsByRace = await RingModel.countDocuments({
        forjadoPor: race,
      });

      if (race == "Sauron" && countRingsByRace === 1) {
        return new ApiResponse({
          success: false,
          message: "Somente um anel pode ser forjado por Sauron",
        });
      }

      if (race == "Anões" && countRingsByRace === 7) {
        return new ApiResponse({
          success: false,
          message: "Somente sete anéis podem ser forjados por Anões",
        });
      }

      if (race == "Elfos" && countRingsByRace === 3) {
        return new ApiResponse({
          success: false,
          message: "Somente três anéis podem ser forjados por Elfos",
        });
      }

      if (race == "Homens" && countRingsByRace === 9) {
        return new ApiResponse({
          success: false,
          message: "Somente nove anéis podem ser forjados por Homens",
        });
      }

      const response = await RingModel.create([body], { session });
      await session.commitTransaction();

      return new ApiResponse<Ring>({
        success: true,
        message: "Anel forjado com sucesso",
        data: response[0],
      });
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    } finally {
      await session.endSession();
    }
  }

  static async UpdateRing(
    body: Ring,
    id: string
  ): Promise<ApiResponse<Ring | null>> {
    const session = await startSession();
    session.startTransaction();

    try {
      const ring = await this.GetRingById(id);

      if (!ring.success) {
        return ring;
      }

      await RingModel.updateOne({ _id: id }, body, { session });

      await session.commitTransaction();

      const updatedRing = await this.GetRingById(id);

      return new ApiResponse<Ring>({
        success: true,
        message: "Anel reforjado com sucesso",
        data: updatedRing.data as Ring,
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);

      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    } finally {
      await session.endSession();
    }
  }

  static async DeleteRing(id: string) {
    const session = await startSession();
    session.startTransaction();

    try {
      const ring = await this.GetRingById(id);

      if (!ring.success) {
        return ring;
      }

      await RingModel.deleteOne({ _id: id }, { session });

      await session.commitTransaction();

      return new ApiResponse({
        success: true,
        message: "Anel banido com sucesso",
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);

      return new ApiResponse({
        success: false,
        message:
          "Um erro inesperado surgiu das sombras. Ocorreu um problema interno. Tente novamente mais tarde, bravo viajante.",
      });
    } finally {
      await session.endSession();
    }
  }
}
