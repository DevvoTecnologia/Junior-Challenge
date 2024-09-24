import Carousel from "@/components/Carousel";
import { Card, Row } from "antd";
import styled from "styled-components";

export const ContainerCardRing = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ContainerInfosRing = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 15px;
	padding: 0px 14px;
`;

export const ContainerImageRing = styled.div`
	padding: 5px 20px;
	width: 220px;
	height: 225px;

	img {
		height: 100%;
	}
`;

export const ContainerInfoRing = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 15px;
`;

export const ContainerHeaderSearch = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ContainerHeaderTitle = styled(Row)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

export const CarouselStyled = styled(Carousel)`
	width: 750px;

	@media (max-width: 640px) {
		width: 450px;
	}

	.carousel-slide {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const CardStyled = styled(Card)`
	width: 100%;
	max-width: 250px;
`;
