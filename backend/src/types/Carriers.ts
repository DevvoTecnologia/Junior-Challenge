export interface CarriersAttributes {
	id: string;
	name: string;
}

export interface CarrierInput extends CarriersAttributes {}
export interface CarrierOutput extends Required<CarriersAttributes> {}
