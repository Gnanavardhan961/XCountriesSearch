import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const formatted = data.map((c) => ({
          name: c.name || "",
          flag: c.flag || "",
        }));

        setCountries(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name &&
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Countries and Flags</h1>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading ? (
        <p>Loading countries...</p>
      ) : (
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
            <p className="no-results">
              No countries found matching "{searchTerm}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
