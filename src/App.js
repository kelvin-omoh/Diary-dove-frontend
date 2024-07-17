import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import toast, { Toaster } from "react-hot-toast";
import Reminder from "./pages/Reminder";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Usercontext, UserContextProvider } from "./context/userContext"; // Assuming you have UserContext and useUserContext defined
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CreateNewPassword from "./pages/CreateNewPassword";
import Settings from "./pages/Settings";
import ChangeEmail from "./pages/ChangeEmail";
import EmailVerivication from "./components/_Verification/EmailVerification/EmailVerification";
import axios from "axios";

// PrivateRoute component

const PrivateRoute = ({ element }) => {
  const { userInfo, logOut } = useContext(Usercontext);

  const checkToken = async () => {
    try {
      const response = await axios.get("api/users/protected", {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      logOut();
    }
  };
  useEffect(() => {
    checkToken();
  }, [userInfo?.token]);

  return userInfo?.token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/email-verification" element={<EmailVerivication />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/new-password" element={<CreateNewPassword />} />

            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/setup"
              element={<PrivateRoute element={<SetUp />} />}
            />
            <Route
              path="/settings"
              element={<PrivateRoute element={<Settings />} />}
            />
            <Route
              path="/settings/reminder"
              element={<PrivateRoute element={<Reminder />} />}
            />
            <Route
              path="/change-email"
              element={<PrivateRoute element={<ChangeEmail />} />}
            />
          </Routes>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
