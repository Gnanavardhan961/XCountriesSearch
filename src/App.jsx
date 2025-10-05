import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        const formatted = data.map((c) => ({
          name: c.name?.common || c.name || "Unknown",
          flag: c.flags?.png || null,
        }));

        setCountries(formatted);
        setFiltered(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, countries]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchBar"
      />

      {error ? (
        <p className="error">Failed to load countries. Please try again.</p>
      ) : filtered.length === 0 ? (
        <p className="noResults">No countries found.</p>
      ) : (
        <div className="countriesGrid">
          {filtered.map((country, index) => (
            <div className="countryCard" key={index}>
              {country.flag ? ( // ✅ render only if flag is valid
                <img src={country.flag} alt={`${country.name} flag`} />
              ) : (
                <div className="noFlag">No flag available</div>
              )}
              <p>{country.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
