import { CreateRingBody } from "@/api/create-ring";
import { Label } from "@/components/ui/label";
import {
  defaultRingImageOption,
  ringImageOptions,
} from "@/utils/ring-images.utils";
import { UseFormSetValue } from "react-hook-form";

type ImageSelectorProps = {
  handleClearImageSelection: () => void;
  selectedImageUrl: string;
  setFormValue: UseFormSetValue<CreateRingBody>;
};

export const ImageSelector = ({
  handleClearImageSelection,
  selectedImageUrl,
  setFormValue,
}: ImageSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>Escolher Imagem</Label>
      <div className="flex flex-wrap gap-4">
        <div>
          <img
            onClick={handleClearImageSelection}
            src={defaultRingImageOption}
            alt="Imagem padrão"
            className={`max-h-20 max-w-20 cursor-pointer rounded-full object-cover ${
              selectedImageUrl === defaultRingImageOption &&
              "border-4 border-blue-500"
            }`}
          />
          <div className="text-[11px] text-gray-400">Imagem padrão</div>
        </div>
        {ringImageOptions.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Miniatura ${index + 1}`}
            className={`h-20 w-20 cursor-pointer rounded-full object-cover ${
              selectedImageUrl === image && "border-4 border-blue-500"
            }`}
            onClick={() => setFormValue("imageUrl", image)}
          />
        ))}
      </div>
    </div>
  );
};
