import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import { Toaster } from "react-hot-toast";

function App() {
  return <div className="App">
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/setup" element={<SetUp />} />
    </Routes>


  </div>;
}

export default App;
