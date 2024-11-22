import React from 'react';

function SearchBar({ keyword, onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
