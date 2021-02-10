import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [country, setCountry] = useState("");//for input
  const [countries, setCountries] = useState(null);
  const [displayCountry, setDisplayCountry] = useState({
    data: null,
    message: "No country found",
  });
  const [weatherInfo,setWeatherInfo]= useState(null)

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
      //set the weather here.
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

  const showCountry = (countryName)=>{
    setDisplayCountry({message:null,data: countries.filter(c=>c.name === countryName)})
    //set the weather here
    const capitalName= countries.filter(c=>c.name===countryName)[0].capital
    console.log(capitalName)
    const weatherData = getTheWeather(capitalName)
    // getTheWeather(capitalName).then(res=> setWeatherInfo(res))
   
  }

  const getTheWeather =(capitalName)=>{
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
   
    const baseUrl = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${capitalName}`

    axios.get(baseUrl).then(res=> {
      console.log(res.data)
      setWeatherInfo({
       capitalName,
       temp: res.data.current.temperature, 
       windSpeed: res.data.current.wind_speed, 
       windDirection: res.data.current.wind_dir,
       iconUrl: res.data.current.weather_icons[0]
       })
     }).catch(err=>console.log(err))

  }

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
                  <li key={l.name}>{l.name} </li>
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
        displayCountry.data.map((c) => <p key={c.name}>{c.name} <button onClick={()=>showCountry(c.name)}>Show</button></p>)}
     {weatherInfo && <div>
       <h4>Weather in {weatherInfo.capitalName}</h4>
       <p>Temperature: {weatherInfo.temp} Celcius</p>
       <figure>
         <img alt='weather icon' src={weatherInfo.iconUrl}/>
       </figure>
       <p>Wind: {weatherInfo.windSpeed} mph direction {weatherInfo.windDirection}</p>
       </div>}
    </div>
  );
};

export default App;
