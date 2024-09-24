import { ButtonStyled, Container, ContainerLogin, WelcomeText } from "./styles";
import { Col, Form, Input, Row } from "antd";
import FormItem from "@/components/FormItem";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useUser } from "@/context/userContext";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

const LoginPage = () => {
	const [form] = useForm();
	const { handleLogin } = useUser();
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<Container>
			<ContainerLogin>
				<WelcomeText>Bem vindo(a)!</WelcomeText>
				<Form form={form} layout="vertical">
					<Row gutter={24}>
						<Col span={24}>
							<FormItem
								label="Usuário"
								name="name"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Input />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem
								label="Senha"
								name="password"
								required
								rules={[{ required: true, message: "Campo obrigatório" }]}
							>
								<Input.Password
									type="password"
									iconRender={(visible: boolean) =>
										visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
									}
								/>
							</FormItem>
						</Col>
					</Row>

					<Row justify={"center"} gutter={24}>
						<ButtonStyled
							size="large"
							loading={loading}
							type="primary"
							onClick={() => {
								setLoading(true);
								form
									.validateFields()
									.then((values) => {
										handleLogin(values);
									})
									.catch((error) => {
										console.log(error);
									})
									.finally(() => {
										setLoading(false);
									});
							}}
						>
							Entrar
						</ButtonStyled>{" "}
					</Row>
				</Form>
			</ContainerLogin>
		</Container>
	);
};

export default LoginPage;
