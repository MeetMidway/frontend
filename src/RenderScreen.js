import React from "react";
import AuthView from "./Screen/AuthView";
import HomeView from "./Screen/HomeView";
import ManageAccount from "./Screen/ManageAccount";
import { UserProvider } from "./contexts/UserProvider";
import { auth } from "./Firebase/Firebase";
import { useState, useEffect } from "react";

function RenderScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  console.log(user)

  if (loading) {
    return null;
  }



  <UserProvider>{user ? <HomeView /> : <AuthView />}</UserProvider>;
}

export default RenderScreen;
