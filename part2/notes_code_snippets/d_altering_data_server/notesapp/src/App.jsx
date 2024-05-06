import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("my new note");
    const [showAll, setShowAll] = useState(true);

    const urlNotes = "http://localhost:3001/notes";

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
        };

        axios.post(urlNotes, newNoteObject).then((res) => {
            console.log(`response post request`);
            setNotes(notes.concat(res.data)); // using concat (never mutate state directly)
            setNewNote("");
        });
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const toggleImportanceOf = (noteId) => {
        console.log(`importance of note id ${noteId} needs to be toggled`);
        const urlNote = `http://localhost:3001/notes/${noteId}`;
        // don't use note obj to mutate a property as this is a reference in the array (state variable)
        const note = notes.find((note) => note.id === noteId); // find return a reference of the object in the array
        // create a copy note obj and mutate here the property
        const changedNoteObj = { ...note, important: !note.important };

        axios.put(urlNote, changedNoteObj).then((res) => {
            setNotes(
                notes.map((noteObj) =>
                    // update state accoding to backend response for specific resource
                    noteObj.id !== noteId ? noteObj : res.data
                )
            );
        });
    };

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
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
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
