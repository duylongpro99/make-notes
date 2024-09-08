import React, { useContext } from "react";
import { db } from "../../appwrite/database";
import colors from "../../assets/colors.json";
import { NoteContext } from "../../context/NoteContext";
import { TColor } from "../../types/note";
import { AddButton } from "../add-btn/AddButton";

export const Color: React.FC<{ color: TColor }> = ({ color }) => {
  const { selectedNote, notes, setNotes } = useContext(NoteContext);
  const changeColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.$id === selectedNote?.$id
      );

      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      } as any;

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes?.(newNotes);

      db.notes.update(selectedNote?.$id, {
        colors: JSON.stringify(color),
      });
    } catch (error) {
      alert("You must select a note before changing colors");
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};
