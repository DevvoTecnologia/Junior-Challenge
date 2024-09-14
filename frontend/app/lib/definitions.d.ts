export interface Ring {
  id: number;
  name: string;
  power: string;
  forgedBy: 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';
  image: string;
}

export interface Owner {
  id: number;
  name: string;
}

export type RawRingData = Omit<Ring, 'id'> & { ownerName: string };

export type APIRingData = {
  ring: Omit<Ring, 'id'>;
  owner: Omit<Owner, 'id'>;
};

export type ExistingRing = Ring & { currentOwner: Owner };
