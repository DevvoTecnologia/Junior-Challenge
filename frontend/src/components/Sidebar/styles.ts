import styled from "styled-components";
import { Menu } from "antd";
import { Sider } from "@/components/Sider";

export const SidebarContainer = styled(Sider)`
	background-color: #0010f0 !important;

	.ant-layout-sider-trigger {
		background-color: #0010f0 !important;
	}
`;

export const MenuArea = styled.div`
	display: flex;
	justify-content: left;
	padding-left: 15px;
	align-items: center;
	display: flex;
	cursor: pointer;
	color: white !important;
	height: 64px;

	svg {
		margin-right: 4px;
	}

	span {
		font-size: 18px;
	}
`;

export const MenuAreaCollapsed = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 5px;
	display: flex;
	cursor: pointer;
	color: white !important;
	height: 64px;

	svg {
		margin-right: 4px;
	}
`;

export const MenuItem = styled.button.attrs({ type: "button" })`
	border: 0;
	background-color: transparent;
	cursor: pointer;
	padding: 6px;

	svg {
		width: 16px;
		height: 16px;
		color: white;
	}
`;

export const MenuContainer = styled(Menu)`
	color: white !important;
	background-color: #0010f0 !important;

	.ant-menu-item {
		color: white !important;

		&:hover {
			color: white !important;
			background-color: red !important;
		}
	}

	.divider {
		color: white !important;
		height: 5px !important;
		width: 100% !important;
		cursor: default !important;

		&:hover {
			background-color: transparent !important;
		}

		.ant-menu-title-content {
			height: 100%;

			.ant-divider-horizontal {
				margin: 0px;
			}
		}
	}

	.ant-menu-submenu-title {
		&:hover {
			color: white !important;
			background-color: red !important;
		}
	}

	.ant-menu-submenu-selected {
		.ant-menu-submenu-title {
			background-color: red !important;
			color: white !important;

			&:hover {
				color: white !important;
				background-color: red !important;
			}
		}
	}

	.ant-menu-submenu-disabled {
		background-color: gray !important;
		color: white !important;
		margin-inline: 4px;

		.ant-menu-submenu-title {
			background-color: transparent !important;
		}
		&:hover {
			color: white !important;
		}
	}

	.ant-menu-item-selected {
		background-color: red !important;
		color: white !important;
	}

	.ant-menu-item-disabled {
		background-color: gray !important;
	}

	.ant-menu-title-content {
		a {
			color: white !important;
		}
	}
`;

export const CompanyArea = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 64px;
	background-color: white;
`;

export const Company = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	padding: 16px;

	svg {
		margin-left: 4px;
	}
`;
