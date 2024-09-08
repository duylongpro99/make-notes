import colors from "../../assets/colors.json";
import { AddButton } from "../add-btn/AddButton";
import { Color } from "../color/color";

export const Controls = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
};
