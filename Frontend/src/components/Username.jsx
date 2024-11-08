import React from "react";

function Username(props) {

    const customCSS = {
        textAlign: "right",
        marginRight: "20px",
        color: "#333",
        fontSize: "1.5rem",
        fontWeight: "bold",
        padding: "10px 15px",
        borderRadius: "8px",
      };
      
  return (
    <>
      <p style={customCSS}>Welcome, {props.name}</p>
    </>
  );
}

export default Username;
