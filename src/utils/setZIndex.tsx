
export const setZIndex = (selected: any) => {
  selected.style.zIndex = 999;

  Array.from(document.getElementsByClassName("note")).forEach((note: any) => {
    if (note !== selected) {
      note.style.zIndex = selected.style.zIndex - 1;
    }
  });
};
