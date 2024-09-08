import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { db } from "../appwrite/database";
import { Spinner } from "../components/spinner/Spinner";
import { TNote } from "../types/note";

export const NoteContext = createContext<{
  notes: TNote[];
  selectedNote?: TNote;
  setSelectedNote?: Dispatch<SetStateAction<TNote | undefined>>;
  setNotes?: Dispatch<SetStateAction<TNote[]>>;
}>({
  notes: [],
  selectedNote: undefined,
});

export const NotesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<TNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<TNote>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
    setLoading(false);
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };

  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};
