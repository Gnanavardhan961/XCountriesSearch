import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
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
        className="search-bar"
      />

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name} className="country-card">
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="flag"
              />
              <p>{country.name}</p>
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
