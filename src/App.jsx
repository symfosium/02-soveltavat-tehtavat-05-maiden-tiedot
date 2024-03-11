import React, { useState, useEffect } from 'react';
import countriesService from './services/countries';
import Countries from './components/Countries';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    countriesService.getAll()
      .then(response => {
        setCountries(response);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);


  const filteredCountries = countries && countries.length > 0 ?
    countries.filter(country =>
      country.name && country.name.common &&
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    ) :
    [];

    useEffect(() => {
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0]);
        setSearchQuery('');
      }
    }, [filteredCountries]);  

    const showCountry = (country) => {
      setSelectedCountry(country);
      setSearchQuery('');
    };

  return (
    <div>
      <h1>Find Country</h1>
      <div>
        <label>Find Countries</label>
        <input onChange={handleSearchChange} value={searchQuery} />
      </div>
      {filteredCountries.length > 0 && filteredCountries.length < 10 ? (
        <Countries filteredCountries={filteredCountries} setCountry={showCountry}/>
      ) : (
        <p>{searchQuery ? 'Too many matches' : null}</p>
      )}
      <div>
        <Country country={selectedCountry}/>
      </div>
      
    </div>
  );
}

export default App;