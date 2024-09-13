export interface PropsRing {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createNewRing: (body: any) => void;
  backHome: () => void;
};