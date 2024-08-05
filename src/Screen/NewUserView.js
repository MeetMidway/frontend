// Screen/NewUserView.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function NewUserView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Account created:", user);
        navigate("/add-preferences");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating account:", errorCode, errorMessage);
        setError("Error creating account. Please try again.");
      });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative">
      <div className="bg-gray-100 h-5/6 w-5/6 rounded-sm bg-shw flex flex-col justify-between items-center pb-10 pt-28">
        <h2>Create Account</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={createAccount}>Create Account</button>
      </div>
    </div>
  );
}

export default NewUserView;
