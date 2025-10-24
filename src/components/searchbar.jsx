import { useState } from "preact/hooks";
import { Icons } from "./icons.jsx";

export default function SearchBar({ onValueChanged, placeholder }) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative group">
      {/* Gradient border background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Input container */}
      <div className="relative bg-surface-primary rounded-xl p-0.5">
        <input
          type="text"
          className="pr-12 w-full bg-surface-secondary border-0 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted outline-none focus:bg-surface-tertiary focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 shadow-lg"
          placeholder={placeholder}
          value={query}
          aria-label={placeholder || "Search"}
          onChange={(e) => {
            // @ts-ignore
            setQuery(e.target.value);
            // @ts-ignore
            onValueChanged(e.target.value);
          }}
        />
        
        {/* Icon container */}
        {query.length > 0 ? (
          <button
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              onValueChanged("");
            }}
            className="top-1/2 right-4 absolute h-fit text-text-muted hover:text-purple-400 transition-all duration-200 -translate-y-1/2 transform hover:scale-110"
          >
            <Icons.close size="1.25em" />
          </button>
        ) : (
          <div className="top-1/2 right-4 absolute text-purple-400 -translate-y-1/2 transform group-hover:scale-110 transition-transform duration-200">
            <Icons.search size="1.25em" />
          </div>
        )}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
}
