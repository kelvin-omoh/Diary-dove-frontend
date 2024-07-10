import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import { Toaster } from "react-hot-toast";
import UserAccout_settings from "./pages/UserAccout_settings";
import Layout from "./components/_settings/Layout";
import Account from "./pages/Account";
import Reminder from "./pages/Reminder";

function App() {
  return <div className="App">


    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/setup" element={<SetUp />} />

      <Route path="/settings" element={
        <Layout>
          <UserAccout_settings />
        </Layout>
        }/>

      <Route path="/settings/account" element={
        <Layout>
          <Account />
        </Layout>
        }/>


      <Route path="/settings/reminder" element={
        <Layout>
          <Reminder />
        </Layout>
        }/>

        
    </Routes>

  </div>;
}

export default App;
