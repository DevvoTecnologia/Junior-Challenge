import type { Anel } from "../../utils/zod/ring";
import "./styles.css";

const CardRing = ({ bearer, forgedBy, image, name, power }: Anel) => {
	return (
		<div className="card-ring">
			<h2>{name}</h2>
			<p>
				<b>Poder:</b> {power}
			</p>
			<p>
				<b>Portador:</b> {bearer}
			</p>
			<p>
				<b>Forjado por:</b> {forgedBy}
			</p>
			<img src={image} alt={name} />
		</div>
	);
};

export default CardRing;