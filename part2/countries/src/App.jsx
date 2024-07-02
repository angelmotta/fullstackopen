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

const App = () => {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);

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
                capital: countryObj.capital ? countryObj.capital[1] : "unknown",
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
        countrySearch = countrySearch.toLowerCase();
        let searchResult = countries.filter((countryObj) => {
            let countryName = countryObj.name.toLowerCase();
            return countryName.includes(countrySearch);
        });

        if (searchResult.length > 10) {
            // Update State of result component (too many results)
            console.log(`Too many matches, specify another filter`);
            return;
        }

        console.log(searchResult);
        // Update State result (list of result or single country)
    };

    return (
        <div>
            <h1>Countries App</h1>
            <Filter searchCountry={country} handleOnChange={onChangeCountry} />
        </div>
    );
};

export default App;
