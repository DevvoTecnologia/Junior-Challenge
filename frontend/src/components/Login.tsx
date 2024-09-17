import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const loginSchema = z.object({
    email: z.string().min(1, "Email é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
    const navigate = useNavigate()
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', data)

            localStorage.setItem("sessionToken", response.data.authentication.sessionToken)

            navigate("/")
        } catch (error) {
            console.error("Erro no login", error)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">Login</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                                    <Input type="password" placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Entrar</Button>
                </form>
            </Form>

            <p className="text-center mt-4">
                Não tem conta?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Cadastre-se aqui
                </Link>
            </p>
        </div>
    )
}
