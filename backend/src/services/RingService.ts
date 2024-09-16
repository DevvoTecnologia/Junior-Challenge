import { ObjectId, startSession } from "mongoose";
import ApiResponse from "../helpers/ApiResponseType";
import RingModel, { Ring } from "../schemas/RingsModel";

export default class RingService {
  static async GetRings(): Promise<ApiResponse<Ring[] | null>> {
    try {
      const rings = await RingModel.find();
      return new ApiResponse<Ring[]>({
        success: true,
        message: "Rings retrieved successfully",
        data: rings,
      });
    } catch (err) {
      console.log(err);
      return new ApiResponse({
        success: false,
        message: "Internal server error getting rings",
      });
    }
  }

  static async GetRingById(ringId: string): Promise<ApiResponse<Ring | null>> {
    try {
      const ring = await RingModel.findById(ringId);

      if (!ring) {
        return new ApiResponse({
          success: false,
          message: "Ring not found",
        });
      }

      return new ApiResponse<Ring>({
        success: true,
        message: "Ring retrieved successfully",
        data: ring,
      });
    } catch (error) {
      return new ApiResponse({
        success: false,
        message: "Internal Server Error getting ring",
      });
    }
  }

  static async GetRingByName(ringName: string): Promise<ApiResponse<Ring>> {
    try {
      const ring = await RingModel.findOne({ nome: ringName });

      if (!ring) {
        return new ApiResponse({
          success: false,
          message: "Ring not found",
        });
      }

      return new ApiResponse<Ring>({
        success: true,
        message: "Ring retrieved successfully",
        data: ring,
      });
    } catch (err) {
      console.log(err);
      return new ApiResponse({
        success: false,
        message: "Internal server error getting ring",
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
          message: "There can only be one ring forged by Sauron",
        });
      }

      if (race == "Anões" && countRingsByRace === 7) {
        return new ApiResponse({
          success: false,
          message: "There can only be seven rings forged by the Dwarves",
        });
      }

      if (race == "Elfos" && countRingsByRace === 3) {
        return new ApiResponse({
          success: false,
          message: "There can only be three rings forged by the Elves",
        });
      }

      if (race == "Homens" && countRingsByRace === 9) {
        return new ApiResponse({
          success: false,
          message: "There can only be nine rings forged",
        });
      }

      const response = await RingModel.create([body], { session });
      await session.commitTransaction();

      return new ApiResponse<Ring>({
        success: true,
        message: "Ring created successfully",
        data: response[0],
      });
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return new ApiResponse({
        success: false,
        message: "Internal server error creating ring",
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
        message: "Ring updated successfully",
        data: updatedRing.data as Ring,
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);

      return new ApiResponse({
        success: false,
        message: "Internal server error updating ring",
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
        message: "Ring deleted successfully",
      });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);

      return new ApiResponse({
        success: false,
        message: "Internal server error deleting ring",
      });
    } finally {
      await session.endSession();
    }
  }
}
