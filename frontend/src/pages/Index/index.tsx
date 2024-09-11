import Carousel from "../../components/Carousel/carousel";
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
				<Carousel />
			</div>
		</main>
	);
};

export default HomePage;
