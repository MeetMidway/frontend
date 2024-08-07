import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthView from "./Screen/AuthView";
import HomeView from "./Screen/HomeView";
import NewUserView from "./Screen/NewUserView";
import AddPreferences from "./Screen/NextScreen";
import RenderScreen from "./RenderScreen";
import "./App.css";
import { UserProvider } from "./contexts/UserProvider";
import { auth } from "./Firebase/Firebase";
import { useEffect, useState } from "react";
import ManageAccount from "./Screen/ManageAccount";

function App() {
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
  return (
    
    <div className="app-container h-screen">

      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <HomeView /> : <AuthView />} />
         {user && <>
          <Route path="/add-preferences" element={<AddPreferences/>} />
          <Route path="/manage-account" element={<ManageAccount/>} />
         </>}
        </Routes>
      </BrowserRouter>
      </UserProvider>
    
    </div>
  );
}

export default App;
