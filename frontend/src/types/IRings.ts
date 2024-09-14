export interface IRings {
	id: string;
	name: string;
	power: string;
	carrier_id: string;
	forged_by: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	carrier: {
		id: string;
		name: "Super dev";
	};
}

export interface IBodyRings {
	name: string;
	power: string;
	carrier_id: string;
	forged_by: string;
	image: any;
}
