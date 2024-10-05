import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAnelDto } from "@/types/anel";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const anelSchema = z.object({
	nome: z.string().min(1, "Nome é obrigatório"),
	poder: z.string().min(1, "Poder é obrigatório"),
	portador: z.string().min(1, "Portador é obrigatório"),
	forjadoPor: z.enum(["Elfos", "Anões", "Homens", "Sauron"]),
	imagem: z.string().url("Deve ser uma URL válida"),
});

type AnelFormData = z.infer<typeof anelSchema>;

interface AnelFormProps {
	onSubmit: (data: CreateAnelDto) => Promise<void>;
	initialData?: Partial<CreateAnelDto>;
}

export const AnelForm: React.FC<AnelFormProps> = ({
	onSubmit,
	initialData,
}) => {
	const form = useForm<AnelFormData>({
		resolver: zodResolver(anelSchema),
		defaultValues: {
			nome: "",
			poder: "",
			portador: "",
			forjadoPor: undefined,
			imagem: "",
			...initialData,
		},
	});

	useEffect(() => {
		form.reset(initialData);
	}, [initialData, form]);

	const handleSubmit = async (data: AnelFormData) => {
		try {
			await onSubmit(data as CreateAnelDto);
			if (!initialData) {
				form.reset();
			}
		} catch (e: unknown) {
			console.error(e);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome do Anel</FormLabel>
							<FormControl>
								<Input placeholder="Nome do Anel" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="poder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Poder do Anel</FormLabel>
							<FormControl>
								<Input placeholder="Poder do Anel" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="portador"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Portador do Anel</FormLabel>
							<FormControl>
								<Input placeholder="Portador do Anel" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="forjadoPor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Forjado por</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Selecione quem forjou o anel" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Elfos">Elfos</SelectItem>
									<SelectItem value="Anões">Anões</SelectItem>
									<SelectItem value="Homens">Homens</SelectItem>
									<SelectItem value="Sauron">Sauron</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="imagem"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL da Imagem</FormLabel>
							<FormControl>
								<Input placeholder="URL da imagem" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Salvar</Button>
			</form>
		</Form>
	);
};
