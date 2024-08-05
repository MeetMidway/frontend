import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthView from "./Screen/AuthView";
import HomeView from "./Screen/HomeView";
import NewUserView from "./Screen/NewUserView";
import AddPreferences from "./Screen/NextScreen";
import RenderScreen from "./RenderScreen";
import "./App.css";

function App() {
  return (
    <div className="app-container h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RenderScreen />} />
          <Route path="/add-preferences" element={<AddPreferences/>} />
          <Route path="/create-account" element={<NewUserView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
