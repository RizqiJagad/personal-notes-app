import React from "react";
import { showFormattedDate } from "../utils";

const NoteList = ({ notes, onDelete, onArchive, onClick }) => {
  if (notes.length === 0) {
    return <p className="notes-list__empty-message">Tidak ada catatan</p>;
  }

  const handleDelete = (e, noteId) => {
    e.stopPropagation(); 
    onDelete(noteId);
  };

  const handleArchive = (e, noteId) => {
    e.stopPropagation(); 
    onArchive(noteId);
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-item" key={note.id} onClick={() => onClick(note)}>
          <div className="note-item__content">
            <h3 className="note-item__title">{note.title}</h3>
            <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
            <p className="note-item__body">{note.body}</p>
          </div>
          <div className="note-item__action">
            <button
              className="note-item__delete-button"
              onClick={(e) => handleDelete(e, note.id)} 
            >
              Hapus
            </button>
            <button
              className="note-item__archive-button"
              onClick={(e) => handleArchive(e, note.id)} 
            >
              {note.archived ? "Unarchive" : "Arsipkan"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
