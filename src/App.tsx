import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Navbar from "./components/Navigation/Navbar";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import ForgotPassword from "./components/Auth/Forgot-password/ForgotPassword";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />        
        <Route path="/forgot-password" element={<ForgotPassword />} />        
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
