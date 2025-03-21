import { useState } from "react";
import './Search.css'

function Search() {
    const [search, setSearch] = useState("");
    
    
    const handleChange = (e: any) => {
      if (e.target.value.length <= 250) {
        setSearch(e.target.value);
      }
    };
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          maxLength={250}
          placeholder="Type here (max 250 characters)..."
          className="w-full max-w-md p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-2">{search.length}/250</p>
      </div>
    );
}


export default Search