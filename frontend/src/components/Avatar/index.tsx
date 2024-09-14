import { useNavigate } from "react-router-dom";
import { AvatarContainer } from "./styles";
import { Dropdown, type MenuProps } from "antd";
import NAVIGATION_CONSTANTS from "@/constants/navigation";

interface AvatarProps {
	src?: string;
}

export default function Avatar({ src }: AvatarProps) {
	const navigate = useNavigate();
	function signOut() {
		localStorage.clear();
		navigate(NAVIGATION_CONSTANTS.LOGIN);
	}

	const items: MenuProps & MenuProps["items"] = [
		{
			key: "1",
			label: "Sair",
			onClick: () => signOut(),
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={["click"]}>
			<AvatarContainer size="large" src={src ? src : null} />
		</Dropdown>
	);
}
