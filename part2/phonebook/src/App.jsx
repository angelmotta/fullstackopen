import { useState } from "react";
import "./styles/main.css";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
        { name: "Mayra Chávez", number: "51-1-123422", id: 5 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchName, setSearchName] = useState("");
    const [personsFiltered, setPersonsFiltered] = useState(persons);

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
            console.log(`Blank text is included in all contacts`);
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

            <div>
                filter shown with
                <input value={searchName} onChange={handleOnChangeSearchName} />
            </div>

            <h2>add a new</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    name:{" "}
                    <input value={newName} onChange={handleOnChangeName} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleOnChangeNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsFiltered.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
