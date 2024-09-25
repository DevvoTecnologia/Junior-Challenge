import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderSettings {
	dots?: boolean;
	infinite?: boolean;
	speed?: number;
	slidesToShow?: number;
	slidesToScroll?: number;
}

interface SliderComponentProps {
	settings?: SliderSettings;
	children: React.ReactNode;
	titulo: string;
}

const defaultSettings: SliderSettings = {
	dots: true,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export default function SliderComponent({
	settings,
	children,
	titulo,
}: Readonly<SliderComponentProps>) {
	const mergedSettings = { ...defaultSettings, ...settings };

	return (
		<div className="my-8 mx-auto max-w-screen-2xl">
			<h2 className="text-center mb-4"> {titulo} </h2>
			<Slider {...mergedSettings}>{children}</Slider>
		</div>
	);
}
