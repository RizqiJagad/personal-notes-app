import React, { useState } from "react";

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [charLimit, setCharLimit] = useState(50);

  const handleTitleChange = (e) => {
    const input = e.target.value;
    if (input.length <= charLimit) {
      setTitle(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onAdd({ title, body });
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="note-input">
      <h2>Tambah Catatan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={handleTitleChange}
          className="note-input__title"
        />
        <p className="note-input__title__char-limit">
          Sisa karakter: {charLimit - title.length}
        </p>
        <textarea
          placeholder="Isi catatan..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="note-input__body"
        ></textarea>
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}

export default NoteForm;
