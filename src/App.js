import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SetUp from "./pages/SetUp";
import Reminder from "./pages/Reminder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CreateNewPassword from "./pages/CreateNewPassword";
import Settings from "./pages/Settings";
import ChangeEmail from "./pages/ChangeEmail";
import EmailVerification from "./components/_Verification/EmailVerification/EmailVerification";
import { PrivateRoute } from "./components/hooks/PrivateRoute";
import { Usercontext, UserContextProvider } from "./context/userContext";
import { ToggleContextProvider } from "./context/toggleContext";
import LandingPage from "./pages/LandingPage";
import Footer from './components/_LandingPage/Footer'
function App() {
  return (
    <UserContextProvider>
      <ToggleContextProvider>
        <div className="App">
          <Toaster position="top-right" reverseOrder={false} />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/reset-password" element={<ForgetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/new-password" element={<CreateNewPassword />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Home />} />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/setup"
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
x              <Route path="/footer" element={<Footer />} />

              
            </Routes>

          </Router>
        </div>
      </ToggleContextProvider>
    </UserContextProvider>
  );
}

export default App;
