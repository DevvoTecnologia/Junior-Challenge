import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Combobox } from '../ui/combo-box';
import { useUpdateRingModal } from '@/hooks/use-update-ring-modal';
import { Edit2 } from 'lucide-react';

interface UpdateRingModalProps {
  ringId: string;
}

export const UpdateRingModal = ({ ringId }: UpdateRingModalProps) => {
  const {
    errors,
    isOpen,
    register,
    setValue,
    clearErrors,
    setIsOpen,
    onSubmit,
  } = useUpdateRingModal(ringId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (isOpen) clearErrors();
      }}
    >
      <DialogTrigger asChild>
        <Button className="absolute top-3 right-3 z-[3]" size="icon">
          <Edit2 className="text-gray-800 size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#231826] text-white border-[#1c111f]">
        <DialogHeader>
          <DialogTitle>Criar anel</DialogTitle>
          <DialogDescription>
            Insira as informações sobre o anel.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <Input
            placeholder="Nome"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            placeholder="Poder"
            {...register('power')}
            error={errors.power?.message}
          />
          <Input
            placeholder="Portador"
            {...register('bearer')}
            error={errors.bearer?.message}
          />
          <Combobox setValue={setValue} error={errors.forgedBy?.message} />
          <Input
            placeholder="Url da imagem"
            {...register('image')}
            error={errors.image?.message}
          />
          <DialogFooter>
            <Button type="submit">Confirmar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
