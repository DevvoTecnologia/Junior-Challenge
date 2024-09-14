import { AiOutlineWarning } from "react-icons/ai";
import { ModalWarningStyled, TitleHeader } from "./styles";
import { MdClose } from "react-icons/md";
import { ModalProps } from "antd/lib";

const ModalWarning = ({ ...rest }: ModalProps) => {
	return (
		<ModalWarningStyled
			centered={true}
			closeIcon={<MdClose color={"#EBEADB"} size={24} />}
			okText={"Confirmar"}
			cancelButtonProps={{ style: { display: "none" } }}
			title={
				<div className="content-header">
					<TitleHeader>Atenção</TitleHeader>
					<AiOutlineWarning color={"#FFF"} size={20} />
				</div>
			}
			{...rest}
		/>
	);
};

export default ModalWarning;
