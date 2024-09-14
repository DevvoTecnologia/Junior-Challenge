import { Row } from "antd";
import { styled } from "styled-components";

export const ContainerHeaderTitle = styled(Row)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

export const ContainerHeaderButtons = styled(Row)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 15px;
`;

export const ContainerForm = styled(Row)`
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 24px;
`;

export const ContainerAttachFile = styled.div`
	display: flex;
	align-items: center;
	gap: 0.7rem;
	margin-bottom: 10px;
	margin-top: 1rem;
`;

export const NameAttachedFile = styled.a`
	color: #000;
	text-decoration: underline;
`;
