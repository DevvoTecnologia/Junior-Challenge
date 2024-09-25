import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
	const authContext = useAuthContext();

	return (
		<header className="w-full bg-slate-300 p-5">
			<ul className="flex justify-center gap-4">
				<li className="text-slate-700 hover:underline cursor-pointer">
					<Link to="/">Home</Link>
				</li>
				{authContext?.usuario ? (
					<>
						<li className="text-slate-700 hover:underline cursor-pointer">
							<Link to="/aneis">Lista</Link>
						</li>
						<li className="text-slate-700 hover:underline cursor-pointer">
							<Link to="/aneis/novo">Novo Anel</Link>
						</li>
					</>
				) : (
					<>
						<li className="text-slate-700 hover:underline cursor-pointer">
							<Link to="/entrar">Entrar</Link>
						</li>
						<li className="text-slate-700 hover:underline cursor-pointer">
							<Link to="/registrar">Registrar</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
