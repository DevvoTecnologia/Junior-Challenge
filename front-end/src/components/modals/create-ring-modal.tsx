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
import paper from '@/assets/paper.png';
import { Combobox } from '../ui/combo-box';
import { useCreateRingModal } from '@/hooks/use-create-ring-modal';

export const CreateRingModal = () => {
  const {
    isOpen,
    errors,
    clearErrors,
    setIsOpen,
    setValue,
    register,
    onSubmit,
  } = useCreateRingModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        if (isOpen) clearErrors();
      }}
    >
      <DialogTrigger asChild>
        <img
          src={paper}
          alt="paper"
          className="absolute -right-80 -bottom-80  transition-all -rotate-[86deg] hover:-rotate-[96deg] hover:-bottom-64 hover:-right-64"
          role="button"
          onClick={() => setIsOpen(true)}
        />
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
