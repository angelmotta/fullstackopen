import { useState, useEffect } from "react";

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
