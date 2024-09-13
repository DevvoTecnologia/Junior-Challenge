import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import { signUp } from "@/services/auth";

const signUpSchema = z.object({
	username: z
		.string()
		.min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
	password: z.string().min(3, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
	onSignUpSuccess: () => void;
}

export function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: SignUpFormData) => {
		setIsLoading(true);
		try {
			await signUp(data.username, data.password);
			toast.success("Cadastro realizado com sucesso!");
			onSignUpSuccess();
		} catch (error) {
			toast.error("Erro ao cadastrar. Tente novamente.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome de usuário</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Cadastrando..." : "Cadastrar"}
				</Button>
			</form>
		</Form>
	);
}
