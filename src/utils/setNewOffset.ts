import { TNoteOffset, TPosition } from "../types/note";

export const setNewOffset = (
  note: TNoteOffset,
  mouseMoveDir: TPosition = { x: 0, y: 0 }
) => {
  const offsetLeft = note.offsetLeft - mouseMoveDir.x;
  const offsetTop = note.offsetTop - mouseMoveDir.y;

  return {
    x: Math.max(0, offsetLeft),
    y: Math.max(0, offsetTop),
  };
};
