import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { RingTypes } from "./RingsCarousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export enum Forger {
    ELFO = 'Elfos',
    ANAO = 'Anões',
    HOMEM = 'Homens',
    SAURON = 'Sauron',
}

const ringSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    power: z.string().min(1, "Poder é obrigatório"),
    carrier: z.string().min(1, "Portador é obrigatório"),
    forgedBy: z.nativeEnum(Forger, { errorMap: () => ({ message: "Forjador inválido" }) }),
    image: z.string().optional(),
})

export type RingFormData = z.infer<typeof ringSchema>

interface RingFormModalProps {
    ring: RingTypes | null
    isCreating: boolean
    onClose: () => void
    updateRings: () => void
}

export function RingFormModal({ ring, isCreating, onClose, updateRings }: RingFormModalProps) {
    const form = useForm<RingFormData>({
        resolver: zodResolver(ringSchema),
        defaultValues: ring || {
            name: "",
            power: "",
            carrier: "",
            forgedBy: Forger.ELFO,
            image: "",
        },
    })

    const onSubmit = async (data: RingFormData) => {
        if (isCreating) {
            console.log("acionado")
            await axios.post('http://localhost:8080/rings', data)
            updateRings()
            console.log("Criar anel:", data)
        } else {
            await axios.patch(`http://localhost:8080/rings/${ring?._id}`, data)
            updateRings()
            console.log("Editar anel:", data)
        }
        onClose()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do Anel" {...field} />
                            </FormControl>
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
                                <Input placeholder="Poder do Anel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="carrier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Portador</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do Portador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="forgedBy"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o forjador" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Forger).map((forger) => (
                                            <SelectItem key={forger} value={forger}>
                                                {forger}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{isCreating ? "Criar" : "Editar"} Anel</Button>
            </form>
        </Form>
    )
}
