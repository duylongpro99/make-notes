import { useContext } from "react";
import { Controls } from "../components/control/Control";
import { Note } from "../components/note/Note";
import { NoteContext } from "../context/NoteContext";
import { convertDataToNote } from "../utils";

export const NotePage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((item) => {
        const note = convertDataToNote(item);
        return <Note key={note.$id} note={note} />;
      })}
      <Controls />
    </div>
  );
};
