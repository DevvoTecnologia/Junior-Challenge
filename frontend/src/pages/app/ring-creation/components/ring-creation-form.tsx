import { createRing } from "@/api/create-ring";
import { ImageSelector } from "@/components/image-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { forgedByNameTranslate } from "@/utils/forged-by-translate.utils";
import { defaultRingImageOption } from "@/utils/ring-images.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type RingCreationFormProps = {
  setCreationSuccess: Dispatch<SetStateAction<boolean>>;
};

const ringCreationForm = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  power: z.string().min(1, "O poder é obrigatório"),
  bearer: z.string().min(1, "O portador é obrigatório"),
  forgedBy: z.string().min(1, "O campo 'Forjado por' é obrigatório"),
  imageUrl: z.string(),
});

type RingCreationForm = z.infer<typeof ringCreationForm>;

export const RingCreationForm = ({
  setCreationSuccess,
}: RingCreationFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigateToGallery = () => navigate("/");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
    watch,
  } = useForm<RingCreationForm>({
    resolver: zodResolver(ringCreationForm),
    defaultValues: {
      imageUrl: defaultRingImageOption,
    },
  });

  const { mutateAsync: createRingFn } = useMutation({
    mutationFn: createRing,
  });

  const handleResetForm = () => reset();

  const handleSave = async (data: RingCreationForm) => {
    try {
      await createRingFn({
        name: data.name,
        power: data.power,
        bearer: data.bearer,
        forgedBy: data.forgedBy,
        imageUrl: data.imageUrl,
      });
      setCreationSuccess(true);
      toast({
        variant: "default",
        title: "Anel Criado",
        description:
          "O Anel foi criado com sucesso. O item foi movido para a sua coleção.",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes("Ring limit for")) {
          toast({
            variant: "destructive",
            title: `O limite para anéis forjados por ${forgedByNameTranslate[data.forgedBy]} foi excedido.`,
          });
          return;
        }
      }
      toast({
        variant: "destructive",
        title: "Algo Deu Errado",
        description:
          "Não foi possível concluir a operação. Por favor, tente novamente mais tarde.",
      });
    }
  };

  const selectedImageUrl = watch("imageUrl");

  const handleClearImageSelection = () => {
    setValue("imageUrl", defaultRingImageOption);
  };

  return (
    <Card className="mt-14 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
      <CardHeader className="flex items-start">
        <Button
          className="p-0"
          variant="link"
          type="button"
          onClick={handleNavigateToGallery}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar para a galeria
        </Button>
        <CardTitle className="pt-2">Crie um Anel</CardTitle>
        <CardDescription>
          Forje o seu próprio anel com poderes especiais.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit(handleSave)} className="w-full space-y-3">
          <ImageSelector
            handleClearImageSelection={handleClearImageSelection}
            selectedImageUrl={selectedImageUrl}
            setFormValue={setValue}
          />
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="power">Poder</Label>
            <Input id="power" type="text" {...register("power")} />
            {errors.power && (
              <p className="text-sm text-red-500">{errors.power.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bearer">Portador</Label>
            <Input id="bearer" type="text" {...register("bearer")} />
            {errors.bearer && (
              <p className="text-sm text-red-500">{errors.bearer.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="forgedBy">Forjado por</Label>
            <Controller
              name="forgedBy"
              control={control}
              render={({ field: { name, onChange, value } }) => {
                return (
                  <>
                    <Select name={name} onValueChange={onChange} value={value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elves">Elfos</SelectItem>
                        <SelectItem value="dwarves">Anões</SelectItem>
                        <SelectItem value="men">Homens</SelectItem>
                        <SelectItem value="sauron">Sauron</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                );
              }}
            />
            {errors.forgedBy && (
              <p className="text-sm text-red-500">
                O campo 'Forjado por' é obrigatório
              </p>
            )}
          </div>
          <div className="flex justify-end gap-x-6">
            <Button variant="link" type="button" onClick={handleResetForm}>
              Limpar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Criar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
