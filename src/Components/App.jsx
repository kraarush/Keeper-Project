import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [id, setNewId] = useState(1);
  const [noteArray, updateNoteArray] = useState([]);

  function handleClick(note) {

    const newNote = { ...note, id: id };
    updateNoteArray((prevValue) => {
      return [...prevValue, newNote];
    });
    setNewId(id => id + 1);
  }

  function handleDelete(currentid){
    console.log(noteArray.length);   
    updateNoteArray((prevValue) => {
      return prevValue.filter((note) => {
        return note.id !== currentid;
      })
    });
    console.log(noteArray.length);   
  }  

  return (
    <div>
      <Header />
      <CreateArea handleClick={handleClick} />
      {noteArray.map((item) => (
        <Note
          title={item.noteTitle}
          content={item.noteBody}
          currentId={item.id}
          key={item.id}
          deleteNote={handleDelete}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
