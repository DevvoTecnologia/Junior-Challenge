import Card from "../../components/CardRing/card-ring";
import "./styles.css";

const HomePage = () => {
	return (
		<main className="container">
			<div className="title-container">
				<h1>Desafio Fullstack: Os Anéis de Poder</h1>
				<p>
					One Challenge to rule them all, One Challenge to find them, One
					Challenge to bring them all, and in the darkness bind them
				</p>
			</div>
			<div className="card-container">
				<Card
					name="Narya, o anel do fogo"
					power="Seu portador ganha resistência ao fogo"
					bearer="Gandalf"
					forgedBy="Elfos"
					image="https://imgs.search.brave.com/tlW8uceajE5eyTwGAqWzFmeh_i4laYuo2T56xkWCNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ1L1VuaWNvX0Fu/ZWxsby5qcGc"
				/>
			</div>
		</main>
	);
};

export default HomePage;
