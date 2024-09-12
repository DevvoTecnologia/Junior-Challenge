import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import Users from "../db/models/Users";
import ErrorNotFound from "../errors/errorNotFound";
import ErrorBase from "../errors/errorBase";

const secret = process.env.SECRET_AUTH as string;

class AuthService {
	async login(dto: { name: string; password: string }) {
		const user = await Users.findOne({
			attributes: ["id", "name", "password"],
			where: {
				name: dto.name,
			},
		});

		if (!user) {
			throw new ErrorNotFound();
		}

		const passwordEquals = await compare(dto.password, user.password);

		if (!passwordEquals) {
			throw new ErrorBase("Username or password incorretos");
		}

		const accessToken = sign({ id: user.id, username: user.name }, secret, {
			expiresIn: 86400,
		});

		return { accessToken };
	}
}

export default AuthService;
