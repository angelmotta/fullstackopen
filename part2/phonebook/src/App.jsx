import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import peopleService from "./services/people";
import "./styles/main.css";

// const { create, getAll } = peopleService;

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

const Person = ({ name, number, handleDelete, idPerson }) => {
    return (
        <li>
            {name} {number}{" "}
            <button onClick={() => handleDelete(name, idPerson)}>Delete</button>
        </li>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]); // all contacts
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searchName, setSearchName] = useState("");
    const [personsFiltered, setPersonsFiltered] = useState([]);
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        console.log(`useEffect execution`);
        peopleService.getAll().then((listPersons) => {
            console.log(`API response:`);
            console.log(listPersons);
            // Update state
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
        return res;
    };

    const handleAddNewNumber = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        const personRegistered = isAlreadyRegistered(newPerson);

        if (personRegistered) {
            const message = `${newPerson.name} is already added to phonebook. Do you want to replace the old number with this new one?`;
            if (confirm(message)) {
                console.log(`Start update operation`);
                newPerson.id = personRegistered.id;
                console.log(newPerson);
                peopleService
                    .update(newPerson)
                    .then((updatedPerson) => {
                        console.log(
                            `Success Update: person data received from API`
                        );
                        console.log(updatedPerson);
                        // Update local state of Contacts
                        const listPersons = persons.filter(
                            (personObj) => personObj.id !== updatedPerson.id
                        );
                        const updatedList = [...listPersons, updatedPerson];
                        setPersons(updatedList);
                        setNewName("");
                        setNewNumber("");
                        const statusOperation = {
                            isSuccess: true,
                            message: `Updated ${updatedPerson.name}`,
                        };
                        setStatusMessage(statusOperation);
                        setTimeout(() => {
                            setStatusMessage(null);
                        }, 5000);
                        if (searchName === "") {
                            console.log(
                                `Search "Blank text" return all contacts`
                            );
                            setPersonsFiltered(updatedList); // all contacts
                        } else {
                            // Keep filtered list
                            const newFilteredList = updatedList.filter(
                                (personObj) =>
                                    personObj.name
                                        .toLowerCase()
                                        .includes(searchName)
                            );
                            setPersonsFiltered(newFilteredList);
                        }
                    })
                    .catch((error) => {
                        console.log(`Update API catch error received`);
                        console.log(error);
                        const statusCode = error.response.status;
                        const messageError =
                            statusCode === 404
                                ? `Contact ${name} has already been removed from the server`
                                : `Something went wrong`;
                        const statusOperation = {
                            isSuccess: false,
                            message: messageError,
                        };

                        setStatusMessage(statusOperation);
                        setTimeout(() => {
                            setStatusMessage(null);
                        }, 5000);
                        // Get a fresh list of contacts from Server
                        console.log(`---- get a fresh list -----`);
                        peopleService.getAll().then((listPersons) => {
                            console.log(`API response:`);
                            console.log(listPersons);
                            // Update state
                            setPersons(listPersons);
                            setPersonsFiltered(listPersons);
                        });
                        setNewName("");
                        setNewNumber("");
                    });
            }
        } else {
            // Make request to API and receive response Obj
            peopleService
                .create(newPerson)
                .then((savedPerson) => {
                    console.log(`received data from API`);
                    console.log(savedPerson);
                    // Set newPersonObj received from API and update state
                    const listNames = [...persons, savedPerson];
                    setPersons(listNames);
                    setNewName("");
                    setNewNumber("");
                    const statusOperation = {
                        isSuccess: true,
                        message: `Added ${savedPerson.name}`,
                    };
                    setStatusMessage(statusOperation);
                    setTimeout(() => {
                        setStatusMessage(null);
                    }, 5000);
                    // Update UI according te search bar status
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
                })
                .catch((error) => {
                    console.log(`something went wrong: create person`);
                    console.error(error);
                });
        }
    };

    const handleDeletePerson = (name, idPerson) => {
        console.log(`Request delete person with id ${idPerson}`);
        if (!confirm(`Are you sure you want to delete '${name}'`)) {
            return;
        }
        console.log(`API request to delete person with id ${idPerson}`);
        peopleService
            .deletePerson(idPerson)
            .then((userDeleted) => {
                console.log(`Delete successfully`);
                console.log(userDeleted);
                const listPersons = persons.filter(
                    (personObj) => personObj.id !== userDeleted.id
                );
                setPersons(listPersons);
                const statusOperation = {
                    isSuccess: true,
                    message: `Deleted ${userDeleted.name}`,
                };

                setStatusMessage(statusOperation);
                setTimeout(() => {
                    setStatusMessage(null);
                }, 5000);
                if (searchName === "") {
                    console.log(`Search "Blank text" return all contacts`);
                    setPersonsFiltered(listPersons); // all contacts
                } else {
                    const theFilterList = listPersons.filter((personObj) =>
                        personObj.name.toLowerCase().includes(searchName)
                    );
                    setPersonsFiltered(theFilterList);
                }
            })
            .catch((error) => {
                console.log(`Delete operation: something went wrong`);
                console.log(error);
                console.log(`status code: ${error.response.status}`);
                const statusCode = error.response.status;
                const messageError =
                    statusCode === 404
                        ? `Contact ${name} has already been removed from the server`
                        : `Something went wrong`;
                const statusOperation = {
                    isSuccess: false,
                    message: messageError,
                };

                setStatusMessage(statusOperation);
                setTimeout(() => {
                    setStatusMessage(null);
                }, 5000);
                // Get a fresh list of contacts from Server
                console.log(`---- get a fresh list -----`);
                peopleService.getAll().then((listPersons) => {
                    console.log(`API response:`);
                    console.log(listPersons);
                    // Update state
                    setPersons(listPersons);
                    setPersonsFiltered(listPersons);
                });
            });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification statusMessage={statusMessage} />
            <Filter
                searchName={searchName}
                handleOnChange={handleOnChangeSearchName}
            />

            <h2>add a new</h2>
            <PersonForm
                handleOnSubmit={handleAddNewNumber}
                newName={newName}
                newNumber={newNumber}
                handleOnChangeName={handleOnChangeName}
                handleOnChangeNumber={handleOnChangeNumber}
            />
            <h2>Numbers</h2>
            <ul>
                {personsFiltered.map((person) => (
                    <Person
                        key={person.id}
                        name={person.name}
                        number={person.number}
                        handleDelete={handleDeletePerson}
                        idPerson={person.id}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;
