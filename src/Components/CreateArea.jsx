import React, { useState } from "react";

function CreateArea(props) {
  const [fullNote, setNewNote] = useState({
    noteTitle: "",
    noteBody: "",
  });

  function handleChange(event) {
    let { name, value } = event.target;
    setNewNote((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleClick(fullNote);
    setNewNote({ noteTitle: "", noteBody: "" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="noteTitle"
          placeholder="Title"
          value={fullNote.noteTitle}
          onChange={handleChange}
        /   >
        <textarea
          name="noteBody"
          placeholder="Take a note ...."
          rows="3"
          value={fullNote.noteBody}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
