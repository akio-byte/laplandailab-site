import React from 'react';

interface Props {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, onChange }) => {
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="w-full max-w-md p-2 border border-slate-700 rounded bg-slate-900 text-white focus:outline-none focus:border-sky-500"
    />
  );
};

export default SearchBar;
