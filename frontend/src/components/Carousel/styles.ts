import { Carousel as CarouselAntd } from "antd";
import styled from "styled-components";

export const CarouselStyle = styled(CarouselAntd)`
	.slick-dots-bottom {
		bottom: -15px;
	}

	.slick-dots {
		justify-content: center;

		@media (max-width: 640px) {
			justify-content: left !important;
		}

		li {
			width: 7px !important;

			button {
				width: 7px !important;
				height: 7px !important;
				background-color: #000 !important;
				border-radius: 8px !important;
			}
		}

		.slick-active {
			width: 17px !important;

			button {
				width: 17px !important;
				height: 7px !important;
				background-color: red !important;
				border-radius: 8px !important;
			}
		}
	}
`;
