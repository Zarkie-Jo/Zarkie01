import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import ContactPage from "./pages/ContactPage";
import ShopOwnersPage from "./pages/ShopOwnersPage";
import UsersPage from "./pages/UsersPage";
import Login from "./components/login/Login";
import { checkAuthStatus } from "./store/authSlice";
import Reportpage from "./pages/Reportpage";
import MaintenanceCenterPage from "./pages/MaintenanceCenter";
import AllDebatesPage from "./pages/AllDebatesPage";
import CreateEventForm from "../../../Frontend/src/pages/AddEvent";
import JoinRequestsPage from "./pages/JoinRequestsPage";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isAuthenticated ? children : null;
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <OverviewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Depates"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/create_event"
          element={
            <PrivateRoute>
              <CreateEventForm />
            </PrivateRoute>
          }
        />
        {/* ////// */}
        <Route
          path="/Users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Adduser"
          element={
            <PrivateRoute>
              <ShopOwnersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <Reportpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/MaintenanceCenter"
          element={
            <PrivateRoute>
              <MaintenanceCenterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-debates"
          element={
            <PrivateRoute>
              <AllDebatesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/join-requests"
          element={
            <PrivateRoute>
              <JoinRequestsPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
