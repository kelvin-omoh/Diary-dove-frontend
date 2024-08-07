import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { UserContextProvider } from "./context/userContext";
import { ToggleContextProvider } from "./context/toggleContext";
import LandingPage from "./pages/LandingPage";
import AOS from 'aos';
import 'aos/dist/aos.css';
import WhatsAppVerification from "./components/Whatappverification/Whatappverification";
import GoogleCallback from "./components/_GoogleCallback/GoogleCallBack";
import { useEffect } from "react";
import Success from "./pages/SuccesFulPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import WhatsappSuccess from "./components/Whatappverification/WhatsappSuccess";
import SetUp2 from "./pages/StepUp2";
import ChangePhoneNumber from "./pages/ChangePhoneNumber";
import WhatsappNoVerification from "./pages/WhatsappNoVerification";
import { QueryClient, QueryClientProvider } from 'react-query';
import ContactPage from "./pages/ContactPage";


const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>


      <UserContextProvider>
        <ToggleContextProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/verify-whatsapp" element={<WhatsAppVerification />} />
              <Route path="/verify-whatsapp/success" element={<WhatsappSuccess />} />
              <Route path="/auth/callback" element={<GoogleCallback />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/reset-password" element={<ForgetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/new-password" element={<CreateNewPassword />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Home />} />} />
              <Route path="/success" element={<Success />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/setup" element={<SetUp />} />
              <Route path="/setup2" element={<SetUp2 />} />
              <Route path="/change/phoneNumber" element={<PrivateRoute element={<ChangePhoneNumber />} />} />
              <Route path="/change/phoneNumber/verify" element={<PrivateRoute element={<WhatsappNoVerification />} />} />

              {/* <Route path="/setup" element={<SetUp />} /> */}


              <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />

              <Route path="/settings/reminder" element={<PrivateRoute element={<Reminder />} />} />
              <Route path="/change-email" element={<PrivateRoute element={<ChangeEmail />} />} />
            </Routes>
          </Router>
        </ToggleContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
