import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from "../assets/AuthContext"; 
import Navbar from "../Components/Navbar";
import AdminNavbar from "../Components/AdminNavbar";
import UserNavbar from "../Components/UserNavbar";
import Homecomp1 from "../Components/Homecomp1";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AdminLogin from '../Components/AdminLogin';
import AdminDashboard from '../Components/AdminDashboard';
import UserManagement from '../Components/UserManagement';
import Footer from '../Components/Footer';
import UserDashboard from '../Components/UserDashboard';
import AccountDetails from '../Components/AccountDetails';
import UpdateAccount from '../Components/UpdateAccount';
import Payments from '../Components/Payments';
import Transactions from '../Components/Transactions';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || (role && userRole !== role)) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/user/login'} />;
  }

  return children;
};

const Home = () => {
  const location = useLocation();

  const noFooterRoutes = [];

  const adminRoutes = ['/admin/login', '/admin/dashboard', '/admin/user-management', '/admin/approved-users'];
  const userRoutes = ['/user/dashboard', '/user/account-details', '/user/payments', '/user/transaction/history'];

  return (
    <div className="HomeWrapper">
      {adminRoutes.some((route) => location.pathname.startsWith(route)) && <AdminNavbar />}
      {userRoutes.some((route) => location.pathname.startsWith(route)) && <UserNavbar />}
      {!adminRoutes.some((route) => location.pathname.startsWith(route)) &&
        !userRoutes.some((route) => location.pathname.startsWith(route)) && <Navbar />}

      <Routes>
        <Route path="/" element={<Homecomp1 />} />
        <Route path="/Homecomp1" element={<Homecomp1 />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user-management"
          element={
            <ProtectedRoute role="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approved-users"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/update-account"
          element={
            <ProtectedRoute role="user">
              <UpdateAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/account-details"
          element={
            <ProtectedRoute role="user">
              <AccountDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/payments"
          element={
            <ProtectedRoute role="user">
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/transactions/history"
          element={
            <ProtectedRoute role="user">
              <Transactions />
            </ProtectedRoute>
          }
        />

      </Routes>
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

const WrappedHome = () => (
  <Router>
    <Home />
  </Router>
);

export default WrappedHome;
