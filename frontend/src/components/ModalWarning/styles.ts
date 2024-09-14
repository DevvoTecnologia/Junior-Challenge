import { Modal as ModalAntD } from "antd";
import styled from "styled-components";

export const ModalWarningStyled = styled(ModalAntD)`
	.ant-modal-content {
		padding: 0;
		border-radius: 10px;

		.ant-modal-close {
			margin-top: 10px;
			color: #fff;
			font-size: 23px !important;
			margin: 0.2rem;
		}
	}
	.ant-modal-body {
		padding: 12px 16px;

		.content-text {
			color: #000;
			font-size: 16px;
			font-weight: 400;
			line-height: 120%;
		}
	}
	.ant-modal-footer {
		border-top: 1px solid #e0e0e0;
		padding: 16px;

		.ant-btn-default {
			border-color: red;
			color: red;
		}
	}

	.ant-modal-header {
		display: flex;
		padding: 16px;
		background-color: #ff8732;
		align-items: center;

		.content-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 16px;
		}
	}
`;
export const TitleHeader = styled.p`
	color: white;
	font-size: 16px;
	font-family: "Inter";
	font-weight: 400;
	margin: 0;
`;
