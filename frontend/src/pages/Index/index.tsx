import { useEffect } from "react";
import Button from "../../components/Button/button";
import "./styles.css";
import Carousel from "../../components/carousel";

const HomePage = () => {
	useEffect(() => {
		document.title = "Desafio Júnior | Home";
	}, []);

	return (
		<main className="container">
			<div className="title-container">
				<h1>Desafio Fullstack: Os Anéis de Poder</h1>
				<p>
					One Challenge to rule them all, One Challenge to find them, One
					Challenge to bring them all, and in the darkness bind them
				</p>
			</div>
			<div className="content-container">
				<Button href="/create" type="button">
					Crie um novo anel
				</Button>
				<Carousel />
			</div>
		</main>
	);
};

export default HomePage;
