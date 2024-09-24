export interface IRings {
	id: string;
	name: string;
	power: string;
	carrier_id: string;
	forged_by: string;
	image: string;
}

export interface IRingInput extends Omit<IRings, "id"> {}
export interface IRingOutput extends Required<IRings> {}
