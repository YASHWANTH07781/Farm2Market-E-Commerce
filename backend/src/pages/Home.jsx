// src/pages/Home.jsx
import React, { useRef } from "react";

export default function Home() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <h1>Home Page</h1>
      <input ref={inputRef} placeholder="Click the button to focus me" />
      <br /><br />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
}
