import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import Username from "./Username";
import { useLocation } from "react-router-dom";

function Home() {

  const backendURL = import.meta.env.VITE_API_BACKEND_TEST_URL;
  const [notes, setNotes] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 
  const userId = location.state?.userId; 

  if (!userId) {
    return <div>Please log in first.</div>;
  }

  async function getNotes() {
    setLoading(true);
    try {
      const result = await axios.get(`${backendURL}/getData`, {
        params: { userId: userId }
      });
      if (result.data) {
        setNotes(result.data);
        console.log(result.data);
        setUserName(result.data[0].name);
      }
    } catch (err) {
      console.log("Error in getNotes: " + err);
    }
    setLoading(false);
  }

  async function addNote(newNote) {
    try {
      await axios.post(`${backendURL}/insertNote`, { ...newNote, userId: userId });
      getNotes();
    } catch (err) {
      console.log("Error in addNote: " + err);
    }
  }

  async function deleteNote(id) {
    try {

      await axios.delete(`${backendURL}/deleteNote/${id}`, { data: { userId: userId } });
      getNotes();
    } catch (err) {
      console.log("Error in deleteNote: " + err);
    }
  }

  useEffect(() => {
    getNotes(); 
  }, [userId]);

  return (
    <div className="mainContainer">
      <Header />
      {userName != '' && <Username name={userName} />}
      <CreateArea onAdd={addNote} />
      {loading ? (
        <div>Loading notes...</div>
      ) : (
        <div className="note-container">
          {notes.map((noteItem,index) => (
            <Note
              key={index}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
