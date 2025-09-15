import { useState, useEffect } from "react";

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded shadow-md transition-all"
        type="text"
        placeholder="Buscar por Nombre, perfil o intereses"
      />
    </div>
  );
}
