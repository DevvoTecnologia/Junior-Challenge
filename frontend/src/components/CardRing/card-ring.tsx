import "./styles.css";
import type { RingType } from "../../../../shared/types";
import RemoveRing from "../RemoveRing/remove-ring";
import EditButton from "../EditButton/edit-button";
import { motion } from "framer-motion";

const CardRing = ({ bearer, id, forgedBy, image, name, power }: RingType) => {
	return (
		<motion.div className="card-ring" whileHover="hover">
			<motion.div
				initial={{ opacity: 0 }}
				variants={{
					hover: { opacity: 1 },
				}}
			>
				<RemoveRing ringId={id} />
			</motion.div>

			<h3>{name}</h3>

			<motion.div
				initial={{ opacity: 0 }}
				variants={{
					hover: { opacity: 1 },
				}}
			>
				<EditButton ringId={id} />
			</motion.div>

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
		</motion.div>
	);
};

export default CardRing;
