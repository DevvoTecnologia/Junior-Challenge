import Slider from "react-slick";
import CardRing from "./CardRing/card-ring";
import { useRingContext } from "../context/RingContext";
import Skeleton from "./Skeleton/skeleton";
import { useEffect } from "react";

const Carousel = () => {
	const { rings, isPending, getAllRings } = useRingContext();

	useEffect(() => {
		getAllRings();
	}, []);

	if (isPending.getAllRings || !rings) {
		return (
			<Slider
				dots={false}
				arrows={false}
				speed={500}
				slidesToShow={4}
				infinite={false}
				responsive={[
					{
						breakpoint: 1536,
						settings: {
							slidesToShow: 3,
						},
					},
					{
						breakpoint: 1028,
						settings: {
							slidesToShow: 2,
						},
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
						},
					},
				]}
			>
				{[1, 2, 3, 4].map((_, index) => (
					<div key={index} className="skeleton-card">
						<Skeleton style={{ width: "98%", height: "100%" }} />
					</div>
				))}
			</Slider>
		);
	}

	if (rings.length === 0) {
		return <h3>Você não tem nenhum anel criado!</h3>;
	}

	return (
		<Slider
			dots={false}
			arrows={false}
			speed={500}
			slidesToShow={4}
			infinite={false}
			responsive={[
				{
					breakpoint: 1536,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 1028,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
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
