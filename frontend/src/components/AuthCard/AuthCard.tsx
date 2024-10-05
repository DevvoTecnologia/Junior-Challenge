import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "react-toastify";

const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string(),
});

const registerSchema = z
	.object({
		name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
		email: z.string().email("Email inválido"),
		password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthCard() {
	const [activeTab, setActiveTab] = React.useState("login");
	const { login, register } = useAuthStore();
	const navigate = useNavigate();

	const loginForm = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const registerForm = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onLoginSubmit = async (data: LoginFormValues) => {
		try {
			await login(data.email, data.password);
			navigate("/dashboard");
		} catch (error) {
			handleLoginError(error);
		}
	};

	const handleLoginError = (error: unknown) => {
		if (!(error instanceof Error)) {
			setLoginError(
				"Erro inesperado ao fazer login. Por favor, tente novamente mais tarde.",
			);
			return;
		}

		const errorMessages: Record<string, string> = {
			"401": "Credenciais inválidas. Por favor, tente novamente.",
			"500": "Erro no servidor. Por favor, tente novamente mais tarde.",
		};

		const statusCode = error.message.match(/\d+/)?.[0];
		const errorMessage = statusCode
			? errorMessages[statusCode]
			: "Erro ao fazer login. Por favor, tente novamente.";

		setLoginError(errorMessage);
	};

	const setLoginError = (message: string) => {
		loginForm.setError("root", { message });
	};

	const onRegisterSubmit = async (data: RegisterFormValues) => {
		try {
			await register(data.name, data.email, data.password);
			toast.success("Cadastro realizado com sucesso. Por favor, faça login.");
			setActiveTab("login");
			registerForm.reset();
		} catch (error) {
			handleRegisterError(error);
		}
	};

	const handleRegisterError = (error: unknown) => {
		if (!(error instanceof Error)) {
			toast.error(
				"Erro inesperado ao realizar o cadastro. Por favor, tente novamente mais tarde.",
			);
			return;
		}

		const errorMessages: Record<string, string> = {
			"400":
				"Dados inválidos. Por favor, verifique as informações e tente novamente.",
			"500": "Email já existente. Por favor, tente novamente com outro email.",
		};

		const statusCode = error.message.match(/\d+/)?.[0];
		const errorMessage = statusCode ? errorMessages[statusCode] : error.message;

		toast.error(
			errorMessage ||
				"Erro ao realizar o cadastro. Por favor, tente novamente mais tarde.",
		);
	};

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Autenticação</CardTitle>
				<CardDescription>Faça login ou crie uma nova conta.</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Cadastro</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<Form {...loginForm}>
							<form
								onSubmit={loginForm.handleSubmit(onLoginSubmit)}
								className="space-y-4"
							>
								<FormField
									control={loginForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="seu@email.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={loginForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button className="w-full" type="submit">
									Entrar
								</Button>
							</form>
						</Form>
						{loginForm.formState.errors.root && (
							<Alert variant="destructive" className="mt-4">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>Erro</AlertTitle>
								<AlertDescription>
									{loginForm.formState.errors.root.message}
								</AlertDescription>
							</Alert>
						)}
					</TabsContent>
					<TabsContent value="register">
						<Form {...registerForm}>
							<form
								onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
								className="space-y-4"
							>
								<FormField
									control={registerForm.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input placeholder="Seu nome" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={registerForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="seu@email.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={registerForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={registerForm.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirmar Senha</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button className="w-full" type="submit">
									Cadastrar
								</Button>
							</form>
						</Form>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
