import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);
      const token = res?.token || res?.data?.token || res?.accessToken;
      if (!token) throw new Error(res?.message || "Login failed");
      login(token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="glass-card p-8 w-full max-w-md space-y-6 animate-fadeUp"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-muted mt-1">Sign in to continue to your dashboard</p>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="form-input w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-input w-full"
        />

        <button className="btn-primary w-full">
          Login
        </button>

        <div className="flex items-center justify-between text-sm">
          <Link to="/register" className="muted-link">Don't have an account? Register</Link>
        </div>
      </form>

    </div>
  );
};

export default Login;