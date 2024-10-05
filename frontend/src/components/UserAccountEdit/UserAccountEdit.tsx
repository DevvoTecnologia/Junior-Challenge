import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccountUpdate } from "@/hooks/useAccountUpdate";
import { useAuthStore } from "@/stores/authStore";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const accountFormSchema = z.object({
	nome: z.string().min(2, {
		message: "O nome deve ter pelo menos 2 caracteres.",
	}),
	email: z.string().email({
		message: "Por favor, insira um endereço de e-mail válido.",
	}),
	imagem: z
		.string()
		.url({
			message: "Por favor, insira uma URL válida para o seu avatar.",
		})
		.optional(),
});

const passwordConfirmSchema = z.object({
	senhaAtual: z.string().min(1, {
		message: "A senha atual é necessária para fazer alterações.",
	}),
});

export default function UserAccountEdit() {
	const { user } = useAuthStore();
	const { updateAccount, isLoading, error } = useAccountUpdate();
	const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
	const [accountData, setAccountData] = useState<z.infer<
		typeof accountFormSchema
	> | null>(null);

	const accountForm = useForm<z.infer<typeof accountFormSchema>>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			nome: user?.nome || "",
			email: user?.email || "",
			imagem: user?.imagem || "",
		},
	});

	const passwordForm = useForm<z.infer<typeof passwordConfirmSchema>>({
		resolver: zodResolver(passwordConfirmSchema),
		defaultValues: {
			senhaAtual: "",
		},
	});

	async function onSubmitAccount(values: z.infer<typeof accountFormSchema>) {
		setAccountData(values);
		setIsPasswordDialogOpen(true);
	}

	async function onConfirmPassword(
		values: z.infer<typeof passwordConfirmSchema>,
	) {
		if (accountData) {
			try {
				await updateAccount(accountData, values.senhaAtual);
				setIsPasswordDialogOpen(false);
				passwordForm.reset();
			} catch (error) {
				console.error("Erro ao atualizar conta:", error);
			}
		}
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Editar Conta</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...accountForm}>
					<form
						onSubmit={accountForm.handleSubmit(onSubmitAccount)}
						className="space-y-4"
					>
						<FormField
							control={accountForm.control}
							name="imagem"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL do Avatar</FormLabel>
									<FormControl>
										<div className="flex items-center space-x-4">
											<Avatar className="w-20 h-20">
												<AvatarImage
													src={field.value || "/placeholder.svg"}
													alt="Pré-visualização do Avatar"
												/>
												<AvatarFallback>Avatar</AvatarFallback>
											</Avatar>
											<Input
												placeholder="https://exemplo.com/seu-avatar.jpg"
												className="flex-1"
												{...field}
											/>
										</div>
									</FormControl>
									<FormDescription>
										Insira uma URL para a imagem do seu avatar.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={accountForm.control}
							name="nome"
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
							control={accountForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="seu.email@exemplo.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Atualizando..." : "Atualizar Conta"}
						</Button>
					</form>
				</Form>

				<Dialog
					open={isPasswordDialogOpen}
					onOpenChange={setIsPasswordDialogOpen}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirmar Alterações</DialogTitle>
						</DialogHeader>
						<Form {...passwordForm}>
							<form
								onSubmit={passwordForm.handleSubmit(onConfirmPassword)}
								className="space-y-4"
							>
								<FormField
									control={passwordForm.control}
									name="senhaAtual"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha Atual</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="Digite a senha atual"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Confirmando..." : "Confirmar Alterações"}
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>

				{error && (
					<Alert variant="destructive" className="mt-4">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Erro</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
			</CardContent>
		</Card>
	);
}
