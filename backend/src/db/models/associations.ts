import Carriers from "./Carriers";
import Rings from "./Rings";

export const associations = () => {
	Rings.belongsTo(Carriers, {
		foreignKey: "carrier_id",
	});
	Carriers.hasOne(Rings, {
		foreignKey: "id",
	});
};
