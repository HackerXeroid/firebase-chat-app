import React from "react";

const SearchBar: React.FC = () => {
  return (
    <form role="search" className="mb-4">
      <label htmlFor="message-search" className="sr-only">
        Search messages
      </label>
      <input
        type="search"
        id="message-search"
        placeholder="Search messages"
        className="w-full p-2 rounded-full bg-gray-100"
      />
    </form>
  );
};

export default SearchBar;
