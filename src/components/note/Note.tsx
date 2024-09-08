import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../appwrite/database";
import { NoteContext } from "../../context/NoteContext";
import { TNote, TPosition } from "../../types/note";
import { autoGrow, setNewOffset, setZIndex } from "../../utils";
import { DeleteButton } from "../delete-btn/DeleteButton";
import { Spinner } from "../spinner/Spinner";
import "./index.css";
type Props = {
  note: TNote;
};

export const Note: React.FC<Props> = ({ note }) => {
  const inputRef = useRef<any>(null);
  const noteRef = useRef<any>(null);
  let startMouse: TPosition = { x: 0, y: 0 };
  const [position, setPosition] = useState(note.position);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef<any>(null);
  const { setSelectedNote, setNotes } = useContext(NoteContext);

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", inputRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(inputRef);
    setZIndex(noteRef.current);
  }, []);

  const onMouseDown = (e: any) => {
    if (e.target.className === "note-header") {
      startMouse.y = e.clientY;
      startMouse.x = e.clientX;

      setZIndex(noteRef.current);

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      setSelectedNote?.(note);
    }
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    const newPosition = setNewOffset(noteRef.current);
    saveData("position", newPosition);
  };

  const onMouseMove = (e: MouseEvent) => {
    let mouseDirection: TPosition = {
      x: startMouse.x - e.clientX,
      y: startMouse.y - e.clientY,
    };

    startMouse.x = e.clientX;
    startMouse.y = e.clientY;

    const newPosition = setNewOffset(noteRef.current, mouseDirection);
    setPosition(newPosition);
  };

  const saveData = async (key: string, value: any) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.colors?.colorBody,
        top: `${position?.y}px`,
        left: `${position?.x}px`,
      }}
      ref={noteRef}
    >
      <div
        className="note-header"
        style={{
          backgroundColor: note.colors?.colorHeader,
        }}
        onMouseDown={onMouseDown}
      >
        <DeleteButton noteId={note.$id} />

        {saving && (
          <div className="note-saving">
            <Spinner color={note.colors?.colorText} />
            <span style={{ color: note.colors?.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="note-body">
        <textarea
          style={{ color: note.colors?.colorText }}
          defaultValue={note.body}
          ref={inputRef}
          onInput={() => autoGrow(inputRef)}
          onFocus={() => {
            setZIndex(noteRef.current);
            setSelectedNote?.(note);
          }}
          onKeyUp={handleKeyUp}
        ></textarea>
      </div>
    </div>
  );
};
