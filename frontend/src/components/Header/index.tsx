import { type ReactElement } from "react";
import {
	BreadCrumbContainer,
	HeaderContainer,
	Image,
	ProfileContainer,
	Text,
	TextStrong,
	UserInfo,
} from "./styles";
import { Space } from "antd";
import BreadCrumb from "../BreadCrumb";
import Avatar from "../Avatar";

export default function Header(): ReactElement {
	return (
		<HeaderContainer>
			{/* <BreadCrumbContainer>
				<BreadCrumb />
			</BreadCrumbContainer> */}

			<ProfileContainer>
				<Space size="small">
					<Avatar />

					<UserInfo>
						<Text>Bem-vindo(a)</Text>
						<TextStrong>Admin</TextStrong>
					</UserInfo>
				</Space>
			</ProfileContainer>

			{/* <Image preview={false} src={ZampOfficeLogo} /> */}
		</HeaderContainer>
	);
}
