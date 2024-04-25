import { useState } from "react";
import Note from "./components/Note";

const App = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((noteObj) => (
                    <Note key={noteObj.id} note={noteObj} />
                ))}
            </ul>
        </div>
    );
};

export default App;
