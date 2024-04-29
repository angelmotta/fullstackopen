import { useState } from "react";
import "./styles/main.css";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-1234567" },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleOnChangeName = (e) => {
        setNewName(e.target.value);
    };

    const handleOnChangeNumber = (e) => {
        setNewNumber(e.target.value);
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
    };

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map((person) => (
                    <li key={person.name}>
                        {person.name} {person.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
