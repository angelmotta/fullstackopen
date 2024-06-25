import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("my new note");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const urlNotes = "http://localhost:3001/notes";

    useEffect(() => {
        console.log(`useEffect`);
        noteService.getAll().then((initialNotes) => {
            // promise fullfiled
            setNotes(initialNotes);
        });
    }, []);

    console.log(`render component with: ${notes.length} notes`);

    const addNoteEventHandler = (event) => {
        event.preventDefault();
        const newNoteObject = {
            content: newNote, // get input data from state variable
            important: Math.random() < 0.5,
        };

        noteService.create(newNoteObject).then((returnedNote) => {
            console.log(`response post request`);
            setNotes(notes.concat(returnedNote)); // using concat (never mutate state directly)
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
        // don't use `note` reference object to mutate a property
        // note is a reference to an item in the notes array in the component's state
        const note = notes.find((note) => note.id === noteId); // find return a reference of the object in the array
        // create a copy note obj and mutate here the property (shallow copy)
        const changedNoteObj = { ...note, important: !note.important };

        noteService
            .update(noteId, changedNoteObj)
            .then((returnedNote) => {
                console.log(`then....returnedNote`);
                console.log(returnedNote);
                setNotes(
                    notes.map((noteObj) =>
                        // update state accoding to backend response for specific resource
                        noteObj.id !== noteId ? noteObj : returnedNote
                    )
                );
            })
            .catch((error) => {
                console.log(`catch error noteService.update()`);
                setErrorMessage(
                    `the note '${note.content}' was already deleted from the server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((noteObj) => noteObj.id !== noteId));
            });
    };
    console.log(`NotesToShow`);
    console.log(notesToShow);
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
