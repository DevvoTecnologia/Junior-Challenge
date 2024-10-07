export interface PropsAccount {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createNewAccount: (body: any) => void;
};