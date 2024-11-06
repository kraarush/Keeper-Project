import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HighlightIcon from "@mui/icons-material/Highlight";
import { formControlClasses } from "@mui/material";

function Header() {
  const navigate = useNavigate();

  const customCSS = {
    marginLeft: 'auto',
  }

  return (
    <header>
      <h1><HighlightIcon/><Button onClick={() => {navigate("/");}} label={'Keeper'} style={{fontSize:''}}></Button></h1>
      <Button onClick={() => {navigate("/home");}} label={'Home'} style={customCSS} fontsize={'25px'}/>
    </header>
  );
}

export default Header;
