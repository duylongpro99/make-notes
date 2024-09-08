export type TNote = {
  $id: string;
  body: string;
  colors: TColor;
  position: TPosition;
};

export type TPosition = {
  x: number;
  y: number;
};

export type TColor = {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
};

export type TNoteOffset = {
  offsetLeft: number;
  offsetTop: number;
};
