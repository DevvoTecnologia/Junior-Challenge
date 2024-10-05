import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Anel } from "@/types/anel";

const anelSchema = z.object({
	nome: z.string().min(1, "Nome é obrigatório"),
	poder: z.string().min(1, "Poder é obrigatório"),
	portador: z.string().min(1, "Portador é obrigatório"),
	forjadoPor: z.enum(["Elfos", "Anões", "Homens", "Sauron"]),
	imagem: z.string().url("Deve ser uma URL válida"),
});

type AnelFormData = z.infer<typeof anelSchema>;

interface EditAnelModalProps {
	anel: Anel | null;
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (id: number, data: Partial<Anel>) => Promise<void>;
}

export const EditAnelModal: React.FC<EditAnelModalProps> = ({
	anel,
	isOpen,
	onClose,
	onUpdate,
}) => {
	const form = useForm<AnelFormData>({
		resolver: zodResolver(anelSchema),
		defaultValues: anel || {
			nome: "",
			poder: "",
			portador: "",
			forjadoPor: "Elfos",
			imagem: "",
		},
	});

	React.useEffect(() => {
		if (anel) {
			form.reset(anel);
		}
	}, [anel, form]);

	const onSubmit = async (data: AnelFormData) => {
		if (anel) {
			await onUpdate(anel.id, data);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar Anel</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel>Poder</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel>Portador</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormControl>
										<select {...field} className="w-full p-2 border rounded">
											<option value="Elfos">Elfos</option>
											<option value="Anões">Anões</option>
											<option value="Homens">Homens</option>
											<option value="Sauron">Sauron</option>
										</select>
									</FormControl>
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
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Salvar Alterações</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
