// Button.js
import React from 'react';

const Button = ({ onClick, disabled, style, label, fontsize = '16px' }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const fontSizeValue = parseInt(fontsize, 10);
  const fontSizeUnit = fontsize.replace(fontSizeValue, '');

  const baseStyle = {
    padding: '10px 20px',
    fontSize: isHovered ? `${fontSizeValue + 2}${fontSizeUnit}` : fontsize,
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};



export default Button;
