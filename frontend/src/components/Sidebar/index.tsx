import { type ReactElement, useState } from "react";
import { type MenuProps } from "antd";
import {
	SidebarContainer,
	MenuContainer,
	MenuArea,
	MenuAreaCollapsed,
} from "./styles";
import { MdMenu } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import NAVIGATION_CONSTANTS from "@/constants/navigation";
import { GiDoorRingHandle } from "react-icons/gi";

type MenuItem = Required<MenuProps>["items"][number];

export function Sidebar(): ReactElement {
	const navigate = useNavigate();
	const location = useLocation();
	const defaultConfigCollapse: any = localStorage.getItem(
		"Config:SideMenuCollapsed"
	);
	const [collapsed, setCollapsed] = useState<boolean>(
		JSON.parse(defaultConfigCollapse) || false
	);

	const items: MenuItem[] = [
		{
			label: "Anéis",
			key: "1",
			icon: <GiDoorRingHandle />,
			onClick: () => {
				navigate(NAVIGATION_CONSTANTS.RINGS_HOME);
			},
		},
	];

	const getSelectedKeys = (pathname: string): string[] => {
		if (pathname.includes(NAVIGATION_CONSTANTS.RINGS_HOME)) {
			return ["1"];
		}

		return [];
	};
	const selectedKeys = getSelectedKeys(location.pathname);

	const handleCollapse = (value: boolean) => {
		setCollapsed(value);
		localStorage.setItem("Config:SideMenuCollapsed", JSON.stringify(value));
	};

	return (
		<SidebarContainer width={230} collapsedWidth={80} collapsed={collapsed}>
			{collapsed ? (
				<MenuAreaCollapsed
					onClick={() => {
						handleCollapse(!collapsed);
					}}
				>
					<MdMenu size={35} />
				</MenuAreaCollapsed>
			) : (
				<MenuArea
					onClick={() => {
						handleCollapse(!collapsed);
					}}
				>
					<MdMenu size={35} />
					<span>Menu</span>
				</MenuArea>
			)}
			<MenuContainer
				selectedKeys={selectedKeys}
				mode="vertical"
				items={items}
			/>
		</SidebarContainer>
	);
}
