import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnelService from "../../services/anel.service";
type anelForm = {
	nome: string;
	poder: string;
	portador: string;
	forjadoPor: string;
	imagem: string;
};

const anelInicial: anelForm = {
	nome: "",
	poder: "",
	portador: "",
	forjadoPor: "",
	imagem: "",
};

const forjadores = ["Elfos", "Anões", "Homens", "Sauron"];

export default function useHook() {
	const { id } = useParams();
	const [anel, setAnel] = useState<anelForm>(anelInicial);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		buscarPorId(id);
	}, [id]);

	function buscarPorId(param: string | undefined) {
		if (param) {
			AnelService.buscarPorId(param).then((data) => setAnel(data));
		} else {
			setAnel(anelInicial);
		}
	}

	function onChangeAnel(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setAnel({ ...anel, [e.target.name]: e.target.value });
	}

	async function onSubmitAnel(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);
		if (id) {
			await AnelService.atualizar(id, anel)
				.then((atualizado) => navigate(`/aneis/${atualizado._id}`))
				.finally(() => setLoading(false));
		} else {
			await AnelService.criar(anel)
				.then((novo) => navigate(`/aneis/${novo._id}`))
				.finally(() => setLoading(false));
		}
	}

	return { onSubmitAnel, onChangeAnel, anel, loading, id, forjadores };
}
