import { useEffect } from "react";
import "./styles.css";
import Carousel from "../../components/carousel";
import { useUserContext } from "../../context/UserContext";
import { motion } from "framer-motion";

const HomePage = () => {
	const { isLogin } = useUserContext();
	useEffect(() => {
		document.title = "Desafio Júnior | Home";
	}, []);

	return (
		<main className="container">
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="title-container"
			>
				<h1>Desafio Fullstack: Os Anéis de Poder</h1>
				<p>
					One Challenge to rule them all, One Challenge to find them, One
					Challenge to bring them all, and in the darkness bind them
				</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="content-container"
			>
				{isLogin ? (
					<Carousel />
				) : (
					<h3>É necessário fazer o login para acessar os anéis</h3>
				)}
			</motion.div>
		</main>
	);
};

export default HomePage;
