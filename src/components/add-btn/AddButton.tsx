import { useContext, useRef } from "react";
import { db } from "../../appwrite/database";
import colors from "../../assets/colors.json";
import { NoteContext } from "../../context/NoteContext";
import { Plus } from "../icons/Plus";

export const AddButton = () => {
  const startingPos = useRef<number>(10);
  const { setNotes } = useContext(NoteContext);

  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;
    const response = await db.notes.create(payload);
    setNotes?.((prevState) => [response, ...prevState]);
  };

  return (
    <div id="add-btn" onClick={addNote}>
      <Plus />
    </div>
  );
};
