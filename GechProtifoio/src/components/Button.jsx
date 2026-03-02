// src/components/Button.jsx
import React from "react";

const Button = ({ text, icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition duration-300 shadow-lg hover:shadow-cyan-500/50 ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
