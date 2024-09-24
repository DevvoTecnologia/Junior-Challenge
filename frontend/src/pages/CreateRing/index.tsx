import FormContent from "@/components/FormContent";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { useCreateRing } from "./context";
import {
	ContainerAttachFile,
	ContainerForm,
	ContainerHeaderButtons,
	ContainerHeaderTitle,
	NameAttachedFile,
} from "./styles";
import { FaRegSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineNoteAlt } from "react-icons/md";
import FormItem from "@/components/FormItem";
import { RiAttachment2 } from "react-icons/ri";
import { InboxOutlined } from "@ant-design/icons";
import { CiEdit } from "react-icons/ci";
const { Dragger } = Upload;

const ContainerActualFileName = ({
	fileName,
	linkUrl,
}: {
	fileName: string;
	linkUrl: string;
}) => (
	<ContainerAttachFile>
		<RiAttachment2 size={20} color={"#000"} />
		<NameAttachedFile href={linkUrl} target="_blank">
			{fileName}
		</NameAttachedFile>
	</ContainerAttachFile>
);

const ContentDragger = () => {
	return (
		<>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Clique ou arraste para fazer o upload</p>
			<p className="ant-upload-hint">Somente arquivos em PDF</p>
		</>
	);
};

const CreateRingPage = () => {
	const {
		form,
		loading,
		handleBack,
		handleBeforeUpload,
		handleSubmit,
		ringById,
	} = useCreateRing();

	return (
		<>
			<FormContent>
				<Col span={24}>
					<Row justify={"space-between"} align={"middle"}>
						<ContainerHeaderTitle>
							<MdOutlineNoteAlt size={24} color={"black"} />
							<h1>Criação de Anel</h1>
						</ContainerHeaderTitle>

						<ContainerHeaderButtons>
							<Button
								icon={<IoMdClose color={"red"} />}
								size="large"
								type="default"
								onClick={() => {
									handleBack();
								}}
							>
								Cancelar
							</Button>
							<Button
								icon={
									ringById ? (
										<CiEdit color={"white"} />
									) : (
										<FaRegSave color={"white"} />
									)
								}
								size="large"
								type="primary"
								loading={loading}
								onClick={() => {
									handleSubmit();
								}}
							>
								{ringById ? "Editar" : "Salvar"}
							</Button>
						</ContainerHeaderButtons>
					</Row>
				</Col>

				<Form form={form} layout="vertical">
					<ContainerForm gutter={24}>
						<Col span={6}>
							<FormItem
								label="Nome:"
								name="name"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Input />
							</FormItem>
						</Col>
						<Col span={6}>
							<FormItem
								label="Poder:"
								name="power"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Input />
							</FormItem>
						</Col>
						<Col span={6}>
							<FormItem
								label="Forjado por:"
								name="forged_by"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Select
									options={[
										{ label: "Elfos", key: "elfos", value: "elfos" },
										{ label: "Anões", key: "anoes", value: "anoes" },
										{ label: "Homens", key: "homens", value: "homens" },
										{ label: "Sauron", key: "sauron", value: "sauron" },
									]}
								/>
							</FormItem>
						</Col>
						<Col span={6}>
							<FormItem
								label="Portador:"
								name="carrier_id"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Input />
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="Imagem:"
								name="image"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Col span={24}>
									<Dragger
										beforeUpload={(file) => {
											handleBeforeUpload(file);
											return false;
										}}
									>
										<ContentDragger />
									</Dragger>
									{ringById && (
										<ContainerActualFileName
											fileName={
												ringById?.image.split("/ring-file/")[1] ||
												"Nome não encontrado"
											}
											linkUrl={ringById.image}
										/>
									)}
								</Col>
							</FormItem>
						</Col>
					</ContainerForm>
					<Row gutter={24}></Row>
				</Form>
			</FormContent>
		</>
	);
};

export default CreateRingPage;
