import * as yup from "yup";

export const usersSchema = yup.object().shape({
	name: yup.string().required(),
	password: yup.string().required(),
});
