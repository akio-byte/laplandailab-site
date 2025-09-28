import React from 'react';

export interface SearchResult {
  title: string;
  url: string;
  type: string;
}

const SearchResults: React.FC<{ results: SearchResult[] }> = ({ results }) => {
  if (results.length === 0) {
    return <p className="text-gray-400">No results.</p>;
  }
  return (
    <ul className="space-y-2">
      {results.map((result, idx) => (
        <li key={idx}>
          <a href={result.url} className="text-sky-400 hover:underline">
            {result.title}
          </a>
          <span className="ml-2 text-gray-500 text-xs">{result.type}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
