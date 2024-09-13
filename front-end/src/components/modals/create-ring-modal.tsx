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

export const CreateRingModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={paper}
          alt="paper"
          className="absolute -right-80 -bottom-80  transition-all -rotate-[86deg] hover:-rotate-[96deg] hover:-bottom-64 hover:-right-64"
          role="button"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#231826] text-white border-[#1c111f]">
        <DialogHeader>
          <DialogTitle>Criar anel</DialogTitle>
          <DialogDescription>
            Insira as informações sobre o anel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Input placeholder="Nome" />
          <Input placeholder="Poder" />
          <Input placeholder="Portador" />
          <Combobox />
          <Input placeholder="Url da imagem" />
        </div>
        <DialogFooter>
          <Button type="submit">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
