import { Row, RowProps } from "antd";
import styled from "styled-components";

export interface FormContentProps extends RowProps {
	pl?: string;
	pt?: string;
	pr?: string;
	mt?: string;
}

export const FormContentStyled = styled(Row)<FormContentProps>`
	padding-right: ${(props) => (props.pr ? props.pr : "0.75rem")};
	padding-left: ${(props) => (props.pl ? props.pl : "0.75rem")};
	padding-top: ${(props) => (props.pt ? props.pt : "0.75rem")};
	margin-top: ${(props) => (props.mt ? props.mt : "0.75rem")};
	border-radius: 8px;
	margin-bottom: 1rem;
	padding: 2rem;
	flex-direction: column;
	width: 100%;
	background-color: white;
`;
