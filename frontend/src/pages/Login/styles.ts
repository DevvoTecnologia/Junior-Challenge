import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
	background-color: #005cf0;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const ContainerLogin = styled.div`
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 300px;
	height: 300px;
	border-radius: 8px;
	padding: 24px;
`;

export const WelcomeText = styled.p`
	color: #040035;
	font-size: 24px;
	font-style: normal;
	font-weight: 800;
	line-height: 20px; /* 58.824% */
`;

export const ButtonStyled = styled(Button)`
	border-radius: 6px !important;
	background-color: #6f41f2 !important;
	width: 150px !important;
`;
export const ContainerFooter = styled.div``;
