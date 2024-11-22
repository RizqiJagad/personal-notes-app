import React, { useState } from "react";
import ReactDOM from "react-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import { getInitialData } from "./utils";
import "./styles/style.css";

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const addNote = ({ title, body }) => {
    const newNote = {
      id: Date.now(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  };

 
  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  
  const activeNotes = filteredNotes.filter(note => !note.archived);
  const archivedNotes = filteredNotes.filter(note => note.archived);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <header className="note-app__header">
        <h1>Aplikasi Catatan</h1>
        <span
          onClick={() => setDarkMode(!darkMode)}
          className="material-icons"
          style={{ cursor: "pointer", fontSize: "32px" }}
        >
          {darkMode ? "dark_mode" : "light_mode"}
        </span>
      </header>
      <div className="note-app__body">
        <SearchBar keyword={searchKeyword} onSearch={setSearchKeyword} />
        <NoteForm onAdd={addNote} />

        <h2>Daftar Catatan</h2>
        <NoteList
          notes={activeNotes}
          onDelete={deleteNote}
          onArchive={archiveNote}
          onClick={openModal} 
        />

        
        <h2>Daftar Catatan Arsip</h2>
        <NoteList
          notes={archivedNotes}
          onDelete={deleteNote}
          onArchive={archiveNote}
          onClick={openModal} 
        />
      </div>

      {isModalOpen && selectedNote && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.body}</p>
            <p><strong>Dibuat pada:</strong> {new Date(selectedNote.createdAt).toLocaleString()}</p>
            <button onClick={closeModal}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
