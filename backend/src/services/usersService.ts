import { UserInput, UsersAttributes } from "types/Users";
import Users from "../db/models/Users";
import ErrorNotFound from "../errors/errorNotFound";

class UsersService {
	async getAll() {
		return await Users.findAll();
	}

	async findOne(id: string) {
		const data = await Users.findByPk(id);
		if (data) {
			return data;
		} else {
			throw new ErrorNotFound();
		}
	}

	async create(dto: UsersAttributes) {
		return await Users.create(dto);
	}

	async update(dto: UserInput, id: string) {
		const data = await this.findOne(id);
		if (data) {
			return await Users.update(dto, { where: { id: id } });
		} else {
			throw new ErrorNotFound();
		}
	}

	async delete(id: string) {
		const data = await this.findOne(id);
		if (data) {
			return await Users.destroy({ where: { id } });
		} else {
			throw new ErrorNotFound();
		}
	}
}

export default UsersService;
