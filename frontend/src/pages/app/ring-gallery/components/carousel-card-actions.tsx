import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Edit, Trash } from "lucide-react";

type CarouselCardActionsProps = {
  editAction: () => void;
  deleteAction: () => void;
};

export const CarouselCardActions = ({
  editAction,
  deleteAction,
}: CarouselCardActionsProps) => {
  return (
    <>
      <Button variant="ghost" onClick={editAction}>
        <Edit className="h-6 w-6" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="mr-4 h-6 w-6 text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza de que deseja excluir este anel? Esta ação é
              permanente e não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAction}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
