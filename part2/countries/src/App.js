import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [displayCountry, setDisplayCountry] = useState({
    data: null,
    message: "No country found",
  });
  const inputChangeHandle = (e) => {
    setCountry(e.target.value);
    let filterList;
    if (e.target.value === "") {
      filterList = [];
    } else {
      filterList = countries.filter((c) =>
        c.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }

    if (filterList.length === 0 && e.target.value !== "") {
      setDisplayCountry({ data: null, message: "No country found" });
    } else if (filterList.length === 1) {
      setDisplayCountry({ data: filterList, message: null });
    } else if (filterList.length <= 10) {
      setDisplayCountry({
        data: filterList.filter((c) => c.name),
        message: null,
      });
    } else if (filterList.length > 10) {
      setDisplayCountry({
        data: null,
        message: "Too many countries matched, please more specific ",
      });
    }
  };
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log(res);
      setCountries(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Countries</h1>
      <form>
        Find countries{" "}
        <input type="text" value={country} onChange={inputChangeHandle} />
      </form>
      {displayCountry.message && displayCountry.message}
      {displayCountry.data &&
        displayCountry.data.length === 1 &&
        displayCountry.data.map((c) => {
          return (
            <div key={c.name}>
              <h2>{c.name}</h2>
              <p>Capital: {c.capital}</p>
              <p>Population: {c.population}</p>
              <h3>Languages</h3>
              <ul>
                {" "}
                {c.languages.map((l) => (
                  <li key={l.name}>{l.name}</li>
                ))}
              </ul>
              <figure style={{ maxWidth: "200px" }}>
                <img alt={c.name} src={c.flag} style={{ width: "100%" }} />
              </figure>
            </div>
          );
        })}
      {displayCountry.data &&
        displayCountry.data.length > 1 &&
        displayCountry.data.map((c) => <p key={c.name}>{c.name}</p>)}
    </div>
  );
};

export default App;
