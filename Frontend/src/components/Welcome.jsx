import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Welcome = () => {
  const backendURL = import.meta.env.VITE_API_BACKEND_URL;
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const { credential } = response;
    const decodedToken = jwtDecode(credential);
    const { name, email } = decodedToken;

    try {
      const result = await axios.post(`${backendURL}/auth/login`, {
        name,
        email,
      });

      if (result.data.userId) {
        navigate("/home", { state: { userId: result.data.userId } });
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginFailure = (response) => {
    console.error("Login failed: ", response);
  };

  const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <Header />
        <div className="welcome-container">
          <h1>Welcome to Keeper</h1>
          <p>
            Your one-stop solution for note keeping. Easily create, edit, and
            manage your notes in a beautiful and intuitive interface.
          </p>
          <GoogleLogin
            onSuccess={responseGoogle}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                className="google-login-button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with Google
              </button>
            )}
          />
          <div className="features">
            <h2>Features</h2>
            <ul>
              <li>Seamless note creation and editing</li>
              <li>Organize notes with tags and categories</li>
              <li>Access your notes from anywhere</li>
              <li>Collaborate with others in real-time</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Welcome;
