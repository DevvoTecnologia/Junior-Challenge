import { CarrierInput, CarriersAttributes } from "types/Carriers";
import Carriers from "../db/models/Carriers";
import Rings from "../db/models/Rings";
import ErrorNotFound from "../errors/errorNotFound";
import ErrorBase from "../errors/errorBase";

class CarriersService {
	async getAll() {
		return await Carriers.findAll();
	}

	async findOne(id: string) {
		const data = await Carriers.findByPk(id);
		if (data) {
			return data;
		} else {
			throw new ErrorNotFound();
		}
	}

	async create(dto: CarriersAttributes) {
		return await Carriers.create(dto);
	}

	async update(dto: CarrierInput, id: string) {
		const data = await this.findOne(id);
		if (data) {
			return await Carriers.update(dto, { where: { id: id } });
		} else {
			throw new ErrorNotFound();
		}
	}

	async delete(id: string) {
		const data = await this.findOne(id);
		if (data) {
			const carrierRing = await Rings.findAll({
				where: {
					carrier_id: id,
				},
			});

			if (carrierRing.length > 0) {
				throw new ErrorBase("Cannot delete carrier while he have ring");
			}

			return await Carriers.destroy({ where: { id } });
		} else {
			throw new ErrorNotFound();
		}
	}
}

export default CarriersService;
