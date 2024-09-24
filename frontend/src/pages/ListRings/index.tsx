import FormContent from "@/components/FormContent";
import { Button, Col, notification, Row } from "antd";
import { useListRings } from "./context";
import {
	CardStyled,
	CarouselStyled,
	ContainerCardRing,
	ContainerHeaderTitle,
	ContainerImageRing,
	ContainerInfoRing,
	ContainerInfosRing,
} from "./styles";
import { GiFlatHammer } from "react-icons/gi";
import { FaRegListAlt, FaSuperpowers } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdAddCircleOutline, MdDelete } from "react-icons/md";
import ModalWarning from "@/components/ModalWarning";
import { isSmallScreen } from "@/helpers/isSmallScreen";

const ListRingsPage = () => {
	const {
		allRings,
		handleEditRing,
		showModalDelete,
		setShowModalDelete,
		dataToDelete,
		setDataToDelete,
		handleDeleteRing,
		loading,
		setLoading,
		handleCreateRing,
	} = useListRings();

	return (
		<>
			<FormContent>
				<Col span={24}>
					<Row justify={"space-between"} align={"middle"}>
						<ContainerHeaderTitle>
							<FaRegListAlt size={24} color={"black"} />
							<h1>Listagem de Anéis</h1>
						</ContainerHeaderTitle>
						<Button
							icon={<MdAddCircleOutline color={"white"} />}
							size="large"
							type="primary"
							onClick={() => {
								handleCreateRing();
							}}
						>
							Cadastrar
						</Button>
					</Row>
				</Col>

				<Row gutter={24} justify={"center"} style={{ marginTop: "16px" }}>
					<CarouselStyled
						dotPosition={"bottom"}
						slidesToShow={isSmallScreen() ? 1 : 2}
						infinite={false}
						autoplay
						slidesToScroll={isSmallScreen() ? 1 : 2}
					>
						{allRings &&
							allRings.map((ring, index) => {
								return (
									<CardStyled
										bordered
										key={index}
										hoverable
										actions={[
											<CiEdit
												key="edit"
												onClick={() => {
													handleEditRing(ring.id);
												}}
											/>,
											<MdDelete
												key="delete"
												onClick={() => {
													setShowModalDelete(true);
													setDataToDelete(ring);
												}}
											/>,
										]}
										title={ring.name}
										cover={
											<ContainerImageRing>
												<img
													alt="imagem-anel"
													src={ring.image}
													onError={({ currentTarget }) => {
														currentTarget.src =
															"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
													}}
												/>
											</ContainerImageRing>
										}
									>
										<ContainerCardRing>
											<ContainerInfosRing>
												<ContainerInfoRing>
													<FaSuperpowers />
													<span> {ring.power} </span>
												</ContainerInfoRing>

												<ContainerInfoRing>
													<BsPersonFill />
													<span> {ring.carrier.name} </span>
												</ContainerInfoRing>

												<ContainerInfoRing>
													<GiFlatHammer />
													<span> {ring.forged_by} </span>
												</ContainerInfoRing>
											</ContainerInfosRing>
										</ContainerCardRing>
									</CardStyled>
								);
							})}
					</CarouselStyled>
				</Row>
			</FormContent>
			<ModalWarning
				open={showModalDelete}
				confirmLoading={loading}
				onCancel={() => {
					setShowModalDelete(false);
				}}
				onOk={() => {
					setLoading(true);
					handleDeleteRing(dataToDelete?.id || "")
						.then(() => {
							setTimeout(() => {
								notification.success({
									message: "Anel deletado com sucesso!",
								});
								setShowModalDelete(false);
								setLoading(false);
								window.location.reload();
							}, 3000);
						})
						.catch((err) => {
							console.log(err);
						});
				}}
			>
				<b>Deseja realizar a exclusão do {dataToDelete?.name}?</b>
			</ModalWarning>
		</>
	);
};

export default ListRingsPage;
