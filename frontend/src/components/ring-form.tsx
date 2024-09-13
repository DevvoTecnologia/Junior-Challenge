import type { Ring } from "../types/ring";
import { Input } from "./ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { type RingFormData, ringSchema } from "@/validators/ring-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "./ui/select";

interface RingFormProps {
	ring?: Ring;
	onSubmit: (ring: RingFormData) => void;
}

export const RingForm: React.FC<RingFormProps> = ({ ring, onSubmit }) => {
	const form = useForm<RingFormData>({
		resolver: zodResolver(ringSchema),
		defaultValues: ring || {
			name: "",
			power: "",
			bearer: "",
			forgedBy: "",
			image: "",
		},
	});

	const handleSubmit = (data: RingFormData) => {
		onSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome do Anel</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome do anel" {...field} />
							</FormControl>
							<FormDescription>O nome único do anel.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="power"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Poder</FormLabel>
							<FormControl>
								<Input placeholder="Descreva o poder do anel" {...field} />
							</FormControl>
							<FormDescription>O poder especial do anel.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bearer"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Portador</FormLabel>
							<FormControl>
								<Input placeholder="Nome do portador do anel" {...field} />
							</FormControl>
							<FormDescription>Quem porta o anel atualmente.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="forgedBy"
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
							<FormDescription>O criador do anel.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagem</FormLabel>
							<FormControl>
								<Input placeholder="URL da imagem do anel" {...field} />
							</FormControl>
							<FormDescription>Endereço da imagem do anel.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Você pode adicionar um campo para a imagem aqui, se necessário */}
				<Button type="submit">{ring ? "Atualizar" : "Criar"} Anel</Button>
			</form>
		</Form>
	);
};
