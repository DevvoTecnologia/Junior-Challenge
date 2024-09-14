export interface IResponse<T> {
	status: number;
	message: string | null;
	errors: string | null;
	data: T;
}
