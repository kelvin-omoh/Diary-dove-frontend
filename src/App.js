import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verification" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<SetUp />} />
      </Routes>
    </div>
  );

}

export default App;
