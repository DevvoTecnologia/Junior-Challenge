import { IRings, IRingInput } from "types/Rings";
import Rings from "../db/models/Rings";
import ErrorNotFound from "../errors/errorNotFound";
import Carriers from "../db/models/Carriers";
import ErrorBase from "../errors/errorBase";
import { v4 } from "uuid";

class RingsService {
	async getAll() {
		return await Rings.findAll({
			include: [
				{
					model: Carriers,
					attributes: ["id", "name"],
				},
			],
		});
	}

	async findOne(id: string) {
		const data = await Rings.findByPk(id, {
			include: [
				{
					model: Carriers,
					attributes: ["id", "name"],
				},
			],
		});
		if (data) {
			return data;
		} else {
			throw new ErrorNotFound();
		}
	}

	async getQuantityByForger(forger: string) {
		const data = await Rings.findAll({
			where: {
				forged_by: forger,
			},
		});

		if (data) {
			return data.length;
		} else {
			throw new ErrorNotFound();
		}
	}

	async create(dto: IRings) {
		const carrier = await Carriers.findOne({ where: { name: dto.carrier_id } });

		if (carrier) {
			return await Rings.create({ ...dto, carrier_id: carrier.id });
		}

		const carrierCreated = await Carriers.create({
			name: dto.carrier_id,
			id: v4(),
		})
			.then(async (carrier) => {
				return await Rings.create({ ...dto, carrier_id: carrier.id });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async update(dto: IRingInput, id: string) {
		const data = await this.findOne(id);
		const carrier = await Carriers.findByPk(dto.carrier_id);

		if (data) {
			if (!carrier) {
				throw new ErrorBase("Carrier not found");
			}

			return await Rings.update(dto, { where: { id: id } });
		} else {
			throw new ErrorNotFound();
		}
	}

	async delete(id: string) {
		const data = await this.findOne(id);
		if (data) {
			return await Rings.destroy({ where: { id } });
		} else {
			throw new ErrorNotFound();
		}
	}
}

export default RingsService;
