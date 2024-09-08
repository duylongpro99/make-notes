import { useContext } from "react";
import { db } from "../../appwrite/database";
import { NoteContext } from "../../context/NoteContext";
import { TNote } from "../../types/note";
import { Trash } from "../trash/Trash";

type Props = {
  noteId: string;
};

export const DeleteButton: React.FC<Props> = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async () => {
    db.notes.delete(noteId);
    setNotes?.((prevState: TNote[]) =>
      prevState.filter((note) => note.$id !== noteId)
    );
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};
