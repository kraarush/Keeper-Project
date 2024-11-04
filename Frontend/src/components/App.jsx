import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  async function getData() {
    const response = await axios.get("https://keeper-project-iyrl.onrender.com/getData");
    console.log(response.data);
    return response.data;
  }

  useEffect(() => {
    async function fetchNotes() {
      const data = await getData();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="mainContainer">
      <Header />
        <CreateArea onAdd={addNote} />
      <div className="note-container">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
