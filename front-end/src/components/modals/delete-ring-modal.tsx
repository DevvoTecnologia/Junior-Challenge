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
import { useDeleteRingModal } from '@/hooks/use-delete-ring-modal';
import { Trash2 } from 'lucide-react';

interface DeleteRingModalProps {
  ringId: string;
}

export const DeleteRingModal = ({ ringId }: DeleteRingModalProps) => {
  const { isOpen, setIsOpen, onSubmit } = useDeleteRingModal(ringId);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          className="absolute top-3 left-3 z-[3]"
          size="icon"
          variant="destructive"
        >
          <Trash2 className="text-black size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#231826] text-white border-[#1c111f]">
        <DialogHeader>
          <DialogTitle>Deletar anel</DialogTitle>
          <DialogDescription>
            Tem certeza que gostaria de deletar o anel?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={onSubmit}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="destructive">
              Deletar
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
