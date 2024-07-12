import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import { Toaster } from "react-hot-toast";
import UserAccout_settings from "./pages/UserAccout_settings";
import Layout from "./components/_settings/Layout";
import Account from "./pages/Account";
import Reminder from "./pages/Reminder";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verification" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<SetUp />} />
        <Route path="/settings" element={
        <Layout>
          <UserAccout_settings />
        </Layout>
        }/>

      

      <Route path="/settings/reminder" element={
        <Layout>
          <Reminder />
        </Layout>
         }/>

      </Routes>
    </div>

)
}

export default App;

