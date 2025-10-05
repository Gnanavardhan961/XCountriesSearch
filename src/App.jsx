import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          common: c.common || c.name?.common || c.name || "Unknown",
          png: c.png || c.flags?.png || c.flag || null,
        }));

        setCountries(formatted);
        setFiltered(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
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

      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : error ? (
        <p className="error">Failed to load countries. Please try again.</p>
      ) : filtered.length === 0 ? (
        <p className="noResults">No countries found.</p>
      ) : (
        <div className="countriesGrid">
          {filtered.map((country, index) => (
            <div className="countryCard" key={index}>
              {country.png ? (
                <img src={country.png} alt={`${country.common} flag`} />
              ) : (
                <div className="noFlag">No flag available</div>
              )}
              <p>{country.common}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
