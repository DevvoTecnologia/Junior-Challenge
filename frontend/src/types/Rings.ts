export interface Ring {
  _id?: string;
  ringname: string;
  forgedby: string;
  carrier: string;
  description: string;
  image?: string;
}

export interface RingFormState {
  ringname: string;
  forgedby: string;
  carrier: string;
  description: string;
  image: string;
}

export interface RingFormProps {
  ring: Ring;
  onSave?: () => void;
}