import { Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './components/pages/Homepage';
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import UpdatePassword from './components/pages/UpdatePassword';
import VerifyEmail from './components/pages/VerifyEmail';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <AboutUs />
            </OpenRoute>
          }
        />
        <Route
          path="contactus"
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
