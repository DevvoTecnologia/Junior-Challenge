import Slider from "react-slick";
import CardRing from "./CardRing/card-ring";
import { useRingContext } from "../context/RingContext";
import Skeleton from "./Skeleton/skeleton";

const Carousel = () => {
	const { rings, isPending } = useRingContext();

	if (isPending.getAllRings) {
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
						<Skeleton style={{ width: "98%", height: 552 }} />
					</div>
				))}
			</Slider>
		);
	}

	if (rings.length === 0) {
		return <p>Você não tem nenhum anel criado!</p>;
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
