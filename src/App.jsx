import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        // Ensure every country has a valid name and flag
        const formatted = data.map((c) => ({
          name: c.name ? c.name : "Unknown",
          flag: c.flag ? c.flag : "https://placehold.co/100x70?text=N/A",
        }));

        setCountries(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to fetch country data.");
      }
    };

    fetchCountries();
  }, []);

  // Safe filter for search
  const filteredCountries = countries.filter(
    (country) =>
      country.name &&
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, idx) => (
            <div key={idx} className="countryCard">
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="flag"
              />
              <p className="country-name">{country.name}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
