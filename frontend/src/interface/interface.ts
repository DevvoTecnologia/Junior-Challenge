export interface ICard {
  id: number;
  name: string;
  power: string;
  carrier: string;
  forgedBy: string;
  image_url?: string;
  onEdit: (id: number) => void;
}
