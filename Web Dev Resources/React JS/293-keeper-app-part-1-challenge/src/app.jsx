import React from "react";

const curr_year = new Date().getFullYear();

function App(){
    return (
    <div>
        <header>
            <h1>Keep Notes</h1>
        </header>
        <div className="note">
            <h1>This is the note title</h1>
            <p>This is the note content</p>
        </div>
        <footer>
            <p>copyright © {curr_year}</p>
        </footer>
    </div>
    );
}

export default App;