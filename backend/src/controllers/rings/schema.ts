import * as yup from "yup";

export const ringSchema = yup.object().shape({
	name: yup.string().required(),
	carrier_id: yup.string().required(),
	forged_by: yup.string().required(),
	power: yup.string().required(),
});
