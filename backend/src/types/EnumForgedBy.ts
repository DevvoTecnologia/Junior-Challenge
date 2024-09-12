export const EnumForgedBy = {
	ELFOS: { max: 3, key: "elfos" },
	ANOES: { max: 7, key: "anoes" },
	HOMENS: { max: 9, key: "homens" },
	SAURON: { max: 1, key: "sauron" },
};

export type IEnumForgedBy = keyof typeof EnumForgedBy;
