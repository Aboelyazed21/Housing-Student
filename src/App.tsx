import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Apartments from "./pages/Apartments";
import ApartmentDetails from "./pages/ApartmentDetails";
import AddApartment from "./pages/AddApartment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";

/* ✅ مكون لحماية الصفحات حسب نوع المستخدم */
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: "admin" | "student" | "owner";
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/* ✅ مكون لإخفاء Navbar في صفحات الأدمن */
const ConditionalNavbar: React.FC = () => {
  const location = useLocation();
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/admin-login");
  return isAdminPage ? null : <Navbar />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        {/* ✅ أضف basename هنا لأن موقعك منشور داخل /housing-student */}
        <Router basename="/housing-student">
          {loading ? (
            <SplashScreen onFinish={() => setLoading(false)} />
          ) : (
            <div
              className="min-h-screen bg-gray-100 text-black transition-colors duration-300"
              dir="rtl"
            >
              <ConditionalNavbar />
              <WhatsAppButton />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/apartments"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <Apartments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/apartment/:id"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <ApartmentDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-apartment"
                  element={
                    <ProtectedRoute requiredRole="owner">
                      <AddApartment />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin" element={<Navigate to="/admin-login" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          )}
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
