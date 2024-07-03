import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const Filter = ({ searchCountry, handleOnChange }) => {
    return (
        <div>
            find countries
            <input value={searchCountry} onChange={handleOnChange}></input>
        </div>
    );
};

const MessageSearch = ({ message }) => {
    return <div>{message}</div>;
};

const CountryResult = ({ country }) => {
    console.log(country);
    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>
                Area: {country.area} km<sup>2</sup>
            </div>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((langElem, idx) => (
                    <li key={idx}>{langElem}</li>
                ))}
            </ul>
            <img src={country.flag}></img>
        </div>
    );
};

const ListCountries = ({ countries, updateResult }) => {
    return (
        <div>
            {countries.map((countryObj, idx) => (
                <div key={idx}>
                    {countryObj.name}
                    <button onClick={() => updateResult(countryObj)}>
                        Show
                    </button>
                </div>
            ))}
        </div>
    );
};

const Result = ({ searchResult, updateResult }) => {
    console.log(`render result`);
    if (!searchResult) {
        return null;
    }
    console.log(searchResult);
    if (searchResult.success) {
        return <CountryResult country={searchResult.country} />;
    } else if (searchResult.list.length === 0) {
        return <MessageSearch message={searchResult.message} />;
    } else {
        return (
            <ListCountries
                countries={searchResult.list}
                updateResult={updateResult}
            />
        );
    }
};

const App = () => {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [result, setResult] = useState(null);

    useEffect(() => {
        console.log(`useEffect execution`);
        console.log(`Fetching data for countries...`);
        countriesService.getAll().then((listCountries) => {
            console.log(`response API: get all countries`);
            console.log(`${listCountries.length} countries in list`);
            const listNames = getListCountries(listCountries);
            setCountries(listNames);
        });
    }, []);

    const getListCountries = (listObjCountries) => {
        const listCountries = listObjCountries.map((countryObj) => {
            // console.log(countryObj.name);
            // console.log(countryObj.capital);
            // console.log(countryObj);
            const langObj = countryObj.languages ? countryObj.languages : [];
            const listLang = Object.entries(langObj).map(
                (langArr) => langArr[1]
            );

            const country = {
                name: countryObj.name?.common,
                capital: countryObj.capital ? countryObj.capital[0] : "unknown",
                area: countryObj.area,
                languages: listLang,
                flag: countryObj.flags?.png,
            };
            return country;
        });
        return listCountries;
    };

    const onChangeCountry = (e) => {
        let countrySearch = e.target.value;
        setCountry(countrySearch);
        if (countrySearch.length === 0) {
            setResult(null);
            return;
        }

        countrySearch = countrySearch.toLowerCase();
        let searchResult = countries.filter((countryObj) => {
            let countryName = countryObj.name.toLowerCase();
            return countryName.includes(countrySearch);
        });

        let resultObj;
        if (searchResult.length > 10) {
            // Update State of result component (too many results)
            console.log(`Hey!! Too many matches, specify another filter`);
            resultObj = {
                success: false,
                list: [],
                message: `Too many matches, specify another filter`,
            };
        } else if (2 <= searchResult.length && searchResult.length <= 10) {
            resultObj = {
                success: false,
                list: searchResult,
            };
        } else if (searchResult.length === 1) {
            resultObj = {
                success: true,
                country: searchResult[0],
            };
        } else {
            resultObj = {
                success: false,
                list: [],
                message: `Country not found`,
            };
        }
        setResult(resultObj);
    };

    const updateResultCountry = (countryObj) => {
        const resultObj = {
            success: true,
            country: countryObj,
        };
        setResult(resultObj);
    };

    return (
        <div>
            <h1>Countries App</h1>
            <Filter searchCountry={country} handleOnChange={onChangeCountry} />
            {result && (
                <Result
                    searchResult={result}
                    updateResult={updateResultCountry}
                />
            )}
        </div>
    );
};

export default App;
