// utils/getRingImage.ts
import dwarfRing from "../assets/dwarf-ring.jpg";
import elffRing from "../assets/elf-ring.jpg";
import humanRing from "../assets/human-ring.jpg";
import sauronRing from "../assets/sauron-ring.jpg";

export const getRingImage = (forgedby: string): string => {
  const images: Record<string, string> = {
    'Humanos': humanRing,
    'Elfos': elffRing,
    'Anões': dwarfRing,
    'Sauron': sauronRing,
  };

  return images[forgedby] || 'default-image-path.jpg'; // Default case if forgedby is unknown
};
