import { useEffect, useState } from "react";
import AnelService from "../../services/anel.service";
import { AnelDto } from "../../types/anel.type";

export default function useHook() {
	const [aneis, setAneis] = useState<AnelDto[]>([]);

	useEffect(() => {
		buscarAneis();
	}, []);

	function buscarAneis() {
		AnelService.listar().then((aneis) => {
			setAneis(aneis);
		});
	}

	function deletar(id: string) {
		AnelService.deletar(id).then(() => buscarAneis());
	}
	return { aneis, deletar };
}
