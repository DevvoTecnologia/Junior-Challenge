import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type RingCreationSuccessProps = {
  setCreationSuccess: Dispatch<SetStateAction<boolean>>;
};

export const RingCreationSuccess = ({
  setCreationSuccess,
}: RingCreationSuccessProps) => {
  const navigate = useNavigate();

  const handleNavigateToGallery = () => navigate("/");
  const handleCreateNewRing = () => setCreationSuccess(false);

  return (
    <Card className="mt-6 w-full max-w-xs pt-12 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-500">
          <Check className="h-20 w-20" />
        </div>

        <p className="size mt-8 text-2xl font-semibold">
          Anel criado com sucesso!
        </p>
        <p className="mt-3 text-center text-base text-gray-400">
          Agora você pode visualizar e editar este anel a qualquer momento.
        </p>

        <CardFooter className="flex justify-end gap-x-6 pt-20">
          <Button
            variant="link"
            type="button"
            onClick={handleNavigateToGallery}
          >
            Voltar para a galeria
          </Button>
          <Button type="button" onClick={handleCreateNewRing}>
            Criar um novo anel
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
