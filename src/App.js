import { BrowserRouter, Route, Routes } from "react-router-dom";
import RenderScreen from "./RenderScreen";
import "./App.css"


function App() {
  return (
    <div className="app-container h-screen">
   <BrowserRouter>
   <Routes>
    <Route path="/" Component={RenderScreen} />
    </Routes></BrowserRouter>
  </div>
  );
}

export default App;
