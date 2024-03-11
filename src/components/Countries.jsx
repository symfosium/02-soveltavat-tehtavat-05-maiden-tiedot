const Countries = ({ filteredCountries }) => {
  
  if (filteredCountries.length === 1) {
    return null;
  }

  return (
    <ul>
      {filteredCountries.map(country => (
        <li key={country.cca2}>
          {country.name.common}
        </li>
      ))}
    </ul>
  );
};

export default Countries;