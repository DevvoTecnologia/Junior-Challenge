import Button from "../../components/Button";
import useHook from "./useHook";

export default function AnelForm() {
	const hook = useHook();

	return (
		<div className="flex flex-col items-center justify-center p-5">
			<h2>Anel</h2>
			<form onSubmit={hook.onSubmitAnel} className="w-full max-w-screen-md flex flex-col gap-5 p-2">
				<div className="row">
					<label htmlFor="nome">Nome: </label>
					<input
						type="text"
						id="nome"
						name="nome"
						value={hook.anel.nome}
						placeholder="..."
						onChange={hook.onChangeAnel}
					/>
				</div>
				<div className="row">
					<label htmlFor="nome">Poder: </label>
					<input
						type="text"
						name="poder"
						value={hook.anel.poder}
						placeholder="..."
						onChange={hook.onChangeAnel}
						disabled={!!hook.id}
					/>
				</div>
				<div className="row">
					<label htmlFor="nome">Portador: </label>
					<input
						type="text"
						name="portador"
						value={hook.anel.portador}
						placeholder="..."
						onChange={hook.onChangeAnel}
					/>
				</div>
				<div className="row">
					<label htmlFor="nome">Forjado por: </label>
					<select
						name="forjadoPor"
						value={hook.anel.forjadoPor}
						onChange={hook.onChangeAnel}
						disabled={!!hook.id}
					>
						<option>Selecione...</option>
						{hook.forjadores.map((forjador) => (
							<option key={forjador} value={forjador}>
								{forjador}
							</option>
						))}
					</select>
				</div>
				<Button variant="primary" type="submit" disabled={hook.loading}>
					{hook.id ? "Atualizar" : "Cadastrar"}
				</Button>
			</form>
		</div>
	);
}
