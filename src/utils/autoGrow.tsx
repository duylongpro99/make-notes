export const autoGrow = (ref: any) => {
  const { current } = ref;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};
