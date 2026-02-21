import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppRoutes = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuth ? <Register /> : <Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;