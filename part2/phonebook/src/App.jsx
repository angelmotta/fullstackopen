import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/main.css";

const Filter = ({ searchName, handleOnChange }) => {
    return (
        <div>
            filter shown with
            <input value={searchName} onChange={handleOnChange} />
        </div>
    );
};

const PersonForm = ({
    handleOnSubmit,
    newName,
    handleOnChangeName,
    newNumber,
    handleOnChangeNumber,
}) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                name: <input value={newName} onChange={handleOnChangeName} />
            </div>
            <div>
                number:{" "}
                <input value={newNumber} onChange={handleOnChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Person = ({ name, number }) => {
    return (
        <li>
            {name} {number}
        </li>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchName, setSearchName] = useState("");
    const [personsFiltered, setPersonsFiltered] = useState([]);

    useEffect(() => {
        console.log(`useEffect execution`);
        const serverEndpoint = "http://localhost:3001/persons";
        axios.get(serverEndpoint).then((res) => {
            console.log(res.data);
            const listPersons = res.data;
            setPersons(listPersons);
            setPersonsFiltered(listPersons);
        });
    }, []);

    const handleOnChangeName = (e) => {
        setNewName(e.target.value);
    };

    const handleOnChangeNumber = (e) => {
        setNewNumber(e.target.value);
    };

    const handleOnChangeSearchName = (e) => {
        let nameToSearch = e.target.value;
        nameToSearch = nameToSearch.toLowerCase();
        setSearchName(nameToSearch);
        console.log("search: ", nameToSearch);
        const listResult = searchPhoneByName(nameToSearch);
        setPersonsFiltered(listResult);
    };

    const searchPhoneByName = (name) => {
        if (name === "") {
            return persons; // all names
        }
        const resultList = persons.filter((person) =>
            person.name.toLowerCase().includes(name)
        );
        console.log("search result:", resultList);
        return resultList;
    };

    const isAlreadyRegistered = (newPerson) => {
        console.log(`Check if is already registered`);
        console.log(newPerson);
        const res = persons.find((person) => person.name === newPerson.name);
        console.log("isAlreadyRegistered?: ", res);
        return res !== undefined;
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        if (isAlreadyRegistered(newPerson)) {
            const message = `${newPerson.name} is already added to phonebook`;
            alert(message);
            return;
        }
        const listNames = [...persons, newPerson];
        setPersons(listNames);
        setNewName("");
        setNewNumber("");

        // Update UI
        if (searchName === "") {
            console.log(`Search "Blank text" return all contacts`);
            setPersonsFiltered(listNames); // all contacts
        } else {
            // Include new person only if it meets the filter text already applied
            console.log(
                `check if new name ${newPerson.name.toLowerCase()} includes the substring ${searchName}`
            );
            if (newPerson.name.toLowerCase().includes(searchName)) {
                console.log("yes it's included");
                setPersonsFiltered([...personsFiltered, newPerson]);
            }
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                searchName={searchName}
                handleOnChange={handleOnChangeSearchName}
            />

            <h2>add a new</h2>
            <PersonForm
                handleOnSubmit={handleOnSubmit}
                newName={newName}
                newNumber={newNumber}
                handleOnChangeName={handleOnChangeName}
                handleOnChangeNumber={handleOnChangeNumber}
            />
            <h2>Numbers</h2>
            <ul>
                {personsFiltered.map((person) => (
                    <Person
                        key={person.name}
                        name={person.name}
                        number={person.number}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
