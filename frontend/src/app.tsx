import { useState } from "react";
import { RingForm } from "./components/ring-form";
import { RingList } from "./components/ring-list";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "./components/ui/dialog";
import { useRings } from "./hooks/use-rings";
import { Toaster } from "./components/ui/sonner";
import { RingFormData } from "./types/ring";

export function App() {
  const { rings, editingRing, handleSubmit, handleEditRing, handleDeleteRing } = useRings()
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onFormSubmit = (data: RingFormData) => {
    handleSubmit(data);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gerenciador de Anéis</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Criar Novo Anel</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRing ? 'Editar Anel' : 'Criar Novo Anel'}</DialogTitle>
            </DialogHeader>
            <RingForm ring={editingRing} onSubmit={onFormSubmit} />
          </DialogContent>
        </Dialog>

        <RingList rings={rings} onEdit={(ring) => {
          handleEditRing(ring);
          setIsDialogOpen(true);
        }} onDelete={handleDeleteRing} />
      </div>
    </>
  )
}
