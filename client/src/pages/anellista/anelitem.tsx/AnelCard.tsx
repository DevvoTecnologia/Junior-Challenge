import { AnelDto } from "../../../types/anel.type";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

type AnelCardProps = {
	anel: AnelDto;
	deletar: (id: string) => void;
};
export default function AnelCard({ anel, deletar }: AnelCardProps) {
	return (
		<div key={anel._id} className="bg-slate-500 relative">
			<img src={anel.imagem} alt={anel.nome + "_imagem"} className="w-full h-72" />
			<div className="absolute bg-black bg-opacity-40 top-0 left-0 w-full h-72 text-white px-20 py-10">
				<p>Nome: {anel.nome}</p>
				<p>Poder: {anel.poder}</p>
				<p>Portador: {anel.portador}</p>
				<p>Forjado por: {anel.forjadoPor}</p>
				<div className="flex gap-3 mt-3">
					<Link to={`/aneis/${anel._id}`}>
						<Button variant="warning">Editar</Button>
					</Link>
					<Button onClick={() => deletar(anel._id)} variant="danger">
						Excluir
					</Button>
				</div>
			</div>
		</div>
	);
}
