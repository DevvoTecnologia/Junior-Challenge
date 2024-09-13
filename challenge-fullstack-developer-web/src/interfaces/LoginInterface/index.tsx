export interface PropsLogin {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  login: (params: any) => void;
  createAccount: () => void;
};