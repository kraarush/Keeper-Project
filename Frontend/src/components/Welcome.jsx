// Welcome.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Header from './Header';
import Footer from './Footer';

const Welcome = () => {
  const responseGoogle = (response) => {
    console.log("Logging in with Google...", response);
  };

  const handleLoginFailure = (response) => {
    console.error("Login failed: ", response);
  };

  const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID;
  console.log(clientId);

  return (
    <div>
      <Header />
      <div className="welcome-container">
        <h1>Welcome to Keeper</h1>
        <p>
          Your one-stop solution for note keeping. Easily create, edit, and manage your notes in a beautiful and intuitive interface.
        </p>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button 
              className="google-login-button" 
              onClick={renderProps.onClick} 
              disabled={renderProps.disabled}
            >
              Login with Google
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
  );
};

export default Welcome;
