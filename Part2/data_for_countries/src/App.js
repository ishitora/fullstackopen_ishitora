import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const reqWeather = async () => {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.name?.common}&appid=${process.env.REACT_APP_API_KEY}`
            );

            setWeather(res.data);
        };

        reqWeather();
    }, []);

    return (
        <div>
            <h3>{country.name?.common}</h3>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <h3>languages</h3>
            {Object.values(country.languages).map((language) => (
                <p key={language}>{language}</p>
            ))}
            <img src={country.flags.png} alt="flag" />
            {weather?.main ? (
                <>
                    {' '}
                    <h3>weather in {country.name?.common}</h3>
                    <p>temperature {weather?.main?.temp - 273.15}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                        alt="weather"
                    />
                    <p>wind {weather?.wind?.speed}m/s</p>
                </>
            ) : (
                'loading...'
            )}
        </div>
    );
};

const Country = ({ country }) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {country?.name?.common}
            <button
                onClick={() => {
                    setOpen((open) => !open);
                }}
            >
                show
            </button>
            {open && <CountryInfo country={country} />}
        </div>
    );
};

const App = () => {
    const [countrtList, setCountrtList] = useState([]);
    const [keyword, setkeyWord] = useState('');

    const countries =
        keyword.trim() !== ''
            ? countrtList.filter((country) =>
                  country?.name?.common
                      ?.toLowerCase()
                      .includes(keyword.trim().toLowerCase())
              )
            : [];

    useEffect(() => {
        const reqCountries = async () => {
            const res = await axios.get('https://restcountries.com/v3.1/all');

            setCountrtList(res.data);
        };

        reqCountries();
    }, []);

    return (
        <div>
            find countries{' '}
            <input
                value={keyword}
                onChange={(e) => {
                    setkeyWord(e.target.value);
                }}
            />
            {countries.length > 10 && (
                <p>Too many matches,specify another filter</p>
            )}
            {countries.length <= 10 &&
                countries.length > 1 &&
                countries.map((country) => (
                    <Country key={country?.name?.common} country={country} />
                ))}
            {countries.length === 1 && <CountryInfo country={countries[0]} />}
            {countries.length === 0 && <p>no matches</p>}
        </div>
    );
};

export default App;
