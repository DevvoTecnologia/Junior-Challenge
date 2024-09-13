export interface PropsHome {
  loading: boolean;
  loadingEdit: boolean;
  listRings: any;
  ringData: any;
  openEdit: boolean;
  openDelete: boolean;
  setOpentEdit: (openEdit: boolean) => void;
  setOpentDelete: (open: boolean) => void;
  setIdDelete: (idDelete: string) => void;
  createNewRing: () => void;
  updateActualRing: (body: any) => void;
  retrieveRingData: (id: any) => void;
  deleteRing: () => void;
  logout: () => void;
};