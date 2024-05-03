import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("my new note");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log(`useEffect`);
        axios.get("http://localhost:3001/notes").then((response) => {
            console.log(`promise fullfiled`);
            const notes = response.data;
            setNotes(notes);
        });
    }, []);
    console.log(`render component with: ${notes.length} notes`);

    const addNoteEventHandler = (event) => {
        event.preventDefault();
        const newNoteObject = {
            content: newNote, // get input data from state variable
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };

        setNotes(notes.concat(newNoteObject)); // using concat (never mutate state directly)
        setNewNote("");
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? "important" : "all"} notes
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </ul>

            <form onSubmit={addNoteEventHandler}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
