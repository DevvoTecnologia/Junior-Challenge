import "./styles.css";
import type { RingType } from "../../../../shared/types";
import RemoveRing from "../RemoveRing/remove-ring";

const CardRing = ({ bearer, id, forgedBy, image, name, power }: RingType) => {
	return (
		<div className="card-ring">
			<RemoveRing ringId={id} />
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
