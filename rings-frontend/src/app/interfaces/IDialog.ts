export interface IDialog {
  id: string;
  btnString: string;
  title: string;
  description: string;
  onClick: (id: string) => void;
}
