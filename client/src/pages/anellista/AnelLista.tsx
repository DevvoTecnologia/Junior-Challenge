import { AnelDto } from "../../types/anel.type";
import SliderComponent from "../../components/Slider.component";
import If from "../../components/If";
import useHook from "./useHook";
import AnelCard from "./anelitem.tsx/AnelCard";

export default function AnelLista() {
	const hook = useHook();

	return (
		<div>
			<If condition={!!hook.aneis.length}>
				<SliderComponent titulo="Aneis de poder">
					{hook.aneis.map((anel: AnelDto) => (
						<AnelCard anel={anel} deletar={hook.deletar} key={anel._id} />
					))}
				</SliderComponent>
			</If>
		</div>
	);
}
