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
        let country = e.target.value;
        country = country.toLowerCase();
        setCountry(country);
        console.log(`search input:`);
        console.log(country);
    };

    return (
        <div>
            <h1>Countries App</h1>
            <Filter searchCountry={country} handleOnChange={onChangeCountry} />
        </div>
    );
};

export default App;
