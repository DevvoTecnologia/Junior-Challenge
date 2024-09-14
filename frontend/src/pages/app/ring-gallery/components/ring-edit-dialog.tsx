import { Ring } from "@/api/get-ring-list";
import { updateRing } from "@/api/update-ring";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { defaultRingImageOption } from "@/utils/ring-images.utils";
import { ImageSelector } from "@/components/image-selector";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { forgedByNameTranslate } from "@/utils/forged-by-translate.utils";

type RingEditDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ring: Ring;
};

const ringEditForm = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  power: z.string().min(1, "O poder é obrigatório"),
  bearer: z.string().min(1, "O portador é obrigatório"),
  forgedBy: z.string().min(1, "O campo 'Forjado por' é obrigatório"),
  imageUrl: z.string(),
});

type RingEditForm = z.infer<typeof ringEditForm>;

export const RingEditDialog = ({
  open,
  setOpen,
  ring,
}: RingEditDialogProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
    reset,
  } = useForm<RingEditForm>({
    resolver: zodResolver(ringEditForm),
    values: {
      name: ring.name,
      power: ring.power,
      bearer: ring.bearer,
      forgedBy: ring.forgedBy,
      imageUrl: ring.imageUrl,
    },
  });

  const { mutateAsync: updateRingFn } = useMutation({
    mutationFn: updateRing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ringList"] });
    },
  });

  const handleUpdateRing = async (data: RingEditForm) => {
    try {
      await updateRingFn({
        name: data.name,
        power: data.power,
        bearer: data.bearer,
        forgedBy: data.forgedBy,
        imageUrl: data.imageUrl,
        id: ring.id,
      });
      reset();
      setOpen(false);
      toast({
        variant: "default",
        title: "Anel Editado",
        description: "A edição foi feita com sucesso.",
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

  const handleOpenDialog = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Anel</DialogTitle>
          <DialogDescription>Insira as novas informações</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateRing)} className="space-y-4">
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
                        <SelectValue />
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
