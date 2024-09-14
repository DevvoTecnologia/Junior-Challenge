import { Layout, Typography, Image as ImageAnt } from "antd";
import styled from "styled-components";

const { Header: HeaderAnt } = Layout;
const { Text: TextAnt } = Typography;

export const HeaderContainer = styled(HeaderAnt)`
	display: flex;
	justify-content: end;
	color: #0010f0;
	background-color: #fff;

	@media (max-width: 1024px) {
		padding-left: 1rem;
		padding-right: 1rem;
	}

	@media (max-width: 1280px) {
		padding-left: 1rem;
		padding-right: 1rem;
	}
`;

export const ProfileContainer = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
`;

export const BreadCrumbContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Text = styled(TextAnt)`
	color: #0010f0;
`;

export const TextStrong = styled(TextAnt)`
	color: #0010f0;
	font-weight: 900;
`;

export const Image = styled(ImageAnt)`
	max-width: 160px;
`;
