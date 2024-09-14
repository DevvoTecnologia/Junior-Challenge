export interface IBodyLogin {
	name: string;
	password: string;
}

export interface IResponseLogin {
	accessToken: string;
}

export interface IUser {
	id: string;
	username: string;
	iat: number;
	exp: number;
}
