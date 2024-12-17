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
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from './components/pages/Error';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory';
import Settings from './components/core/Dashboard/Settings/Settings';
import Cart from './components/core/Dashboard/Cart/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from './utils/store/store';
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourses/MyCourses';

function App() {
  const { user } = useSelector((state: RootState) => state.profile);

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
          path="contact"
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

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route
            path="dashboard/purchase-history"
            element={<PurchaseHistory />}
          />
          <Route path="dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
