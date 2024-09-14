import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RingEditDialog } from "./components/ring-edit-dialog";
import { Ring } from "@/api/get-ring-list";
import { useNavigate } from "react-router-dom";
import { Gallery } from "./components/gallery";
import { PlusCircle } from "lucide-react";

export const RingGallery = () => {
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRing, setSelectedRing] = useState<Ring | null>(null);

  const handleOpenEditDialog = () => setIsDialogOpen(true);

  const handleSetSelectedRing = (ring: Ring) => setSelectedRing(ring);

  return (
    <>
      <Button
        className="mb-10 mr-6 mt-6 flex self-end"
        onClick={() => navigate("/creation")}
      >
        <PlusCircle className="mr-1 h-4 w-4" />
        Novo Anel
      </Button>
      <Gallery
        handleOpenEditDialog={handleOpenEditDialog}
        handleSetSelectedRing={handleSetSelectedRing}
      />
      {selectedRing && (
        <RingEditDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          ring={selectedRing}
        />
      )}
    </>
  );
};
