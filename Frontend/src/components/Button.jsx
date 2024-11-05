// Button.js
import React from 'react';

const Button = ({ label, onClick, style, disabled = false }) => {
  return (
    <button
      type="button"
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
