// NotFound.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

const NotFound = () => {
  const navigate  = useNavigate();
  const customCSS = {
    backgroundColor:"#f5ba13",
    fontSize:"20px",
  }
  return (
    <>
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-center vh-50 text-center">
        <div className="mb-4">
          <i className="fas fa-exclamation-triangle fa-5x text-warning"></i>
        </div>
        <ErrorOutlineIcon style={{ fontSize: '6rem', color: grey[600] }} />
        <h1 className="display-3 text-dark">404</h1>
        <h2 className="text-muted">Page Not Found</h2>
        <p className="text-muted mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Button label={'Go to home'} onClick={()=>{navigate('/')}} style={customCSS}/>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
