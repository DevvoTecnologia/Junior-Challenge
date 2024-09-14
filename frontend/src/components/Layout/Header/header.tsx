import { useUserContext } from "../../../context/UserContext";
import Button from "../../Button/button";
import "./styles.css";
import { motion } from "framer-motion";

const Header = () => {
	const { isLogin, logout, isPending } = useUserContext();

	return (
		<header className="header">
			<motion.a
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				href="/"
			>
				<h1>Desafio Júnior</h1>
			</motion.a>
			<motion.nav
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
			>
				{isPending.login ? (
					<p>carregando</p>
				) : isLogin ? (
					<>
						<Button outline href="/create" type="button">
							Crie um novo anel
						</Button>
						<Button onClick={() => logout()} type="button">
							Sair da conta
						</Button>
					</>
				) : (
					<>
						<Button outline href="/login" type="button">
							Login
						</Button>
						<Button href="/register" type="button">
							Crie uma conta
						</Button>
					</>
				)}
			</motion.nav>
		</header>
	);
};

export default Header;
