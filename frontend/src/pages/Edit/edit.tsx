import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormEditRing from "../../components/Forms/EditRing/form-edit-ring";
import { useRingContext } from "../../context/RingContext";

const EditPage = () => {
	const { id } = useParams();

	useEffect(() => {
		document.title = "Desafio Júnior | Editar um anel";
	}, []);

	return <main className="container centralize">{/* <FormEditRing /> */}</main>;
};

export default EditPage;
