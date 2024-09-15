import { createAccount, Login } from "@/src/actions/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .min(1, "O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 dígitos"),
  diffTab: z.literal("register"),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .min(1, "O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 dígitos"),
  diffTab: z.literal("login"),
});

// Usando discriminatedUnion
const FormSchema = z.discriminatedUnion("diffTab", [
  registerSchema,
  loginSchema,
]);

export type TFormSchema = z.infer<typeof FormSchema>;
export const useLoginForm = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      diffTab: "login",
      email: "",
      password: "",
    },
  });

  const handleChangeTab = (currentTab: "login" | "register") => {
    if (currentTab === "login") {
      return form.setValue("diffTab", "register");
    }

    return form.setValue("diffTab", "login");
  };
  const onSubmit = async (data: TFormSchema) => {
    if (data.diffTab === "login") {
      const response = await Login(data);

      if (response && response?.statusCode >= 400) {
        return toast.error(response?.body?.error);
      }

      return toast.success("Login efetuado com sucesso");
    }

    const response = await createAccount(data);

    if (response && response?.statusCode >= 400) {
      return toast.error(response?.body?.error);
    }

    toast.success("Conta criada com sucesso");
  };

  return { form, onSubmit, errors: form.formState.errors, handleChangeTab };
};
