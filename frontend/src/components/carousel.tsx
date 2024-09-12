import Slider from "react-slick";
import CardRing from "./CardRing/card-ring";
import { useRingContext } from "../context/RingContext";

const Carousel = () => {
	const { rings, pendingRings } = useRingContext();

	if (pendingRings) {
		return <p>Carregando aneis...</p>;
	}

	if (rings.length === 0) {
		return <p>Você não tem nenhum anel criado!</p>;
	}

	return (
		<Slider
			dots
			initialSlide={0}
			speed={500}
			slidesToScroll={rings.length >= 4 ? 4 : rings.length}
			slidesToShow={rings.length >= 4 ? 4 : rings.length}
			pauseOnHover
			infinite={false}
			autoplay
			responsive={[
				{
					breakpoint: 1536,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 1028,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			]}
		>
			{rings.map((ring) => (
				<CardRing
					key={ring.id}
					name={ring.name}
					power={ring.power}
					bearer={ring.bearer}
					forgedBy={ring.forgedBy}
					image={ring.image}
					id={ring.id}
				/>
			))}
		</Slider>
	);
};

export default Carousel;
