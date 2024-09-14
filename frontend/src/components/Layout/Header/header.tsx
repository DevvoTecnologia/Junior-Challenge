import { destroyCookie } from "nookies";
import { useUserContext } from "../../../context/UserContext";
import Button from "../../Button/button";
import "./styles.css";

const Header = () => {
	const { isLogin } = useUserContext();

	return (
		<header className="header">
			<a href="/">
				<h1>Desafio Júnior</h1>
			</a>
			<nav>
				{isLogin ? (
					<>
						<Button outline href="/create" type="button">
							Crie um novo anel
						</Button>
						<Button
							onClick={() => {
								destroyCookie(null, "userToken");
								window.location.reload();
							}}
							type="button"
						>
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
			</nav>
		</header>
	);
};

export default Header;
