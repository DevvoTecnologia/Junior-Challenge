import * as yup from "yup";

export const carriersSchema = yup.object().shape({
	name: yup.string().required(),
});
