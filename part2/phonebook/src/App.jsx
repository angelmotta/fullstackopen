import { useState } from "react";
import "./styles/main.css";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleOnChangeName = (e) => {
        setNewName(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
        };

        console.log(newPerson);
        const listNames = [...persons, newPerson];
        console.log(listNames);

        setPersons(listNames);
        setNewName("");
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
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => (
                    <li key={person.name}>{person.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
