import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);
      toast.success("Registered successfully — please login");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="glass-card p-8 w-full max-w-md space-y-5 animate-fadeUp"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Create an account</h2>
          <p className="text-sm text-muted mt-1">Start tracking analytics in minutes</p>
        </div>

        <input name="username" placeholder="Username" onChange={handleChange} className="form-input w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="form-input w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-input w-full" />
        <input name="age" placeholder="Age" onChange={handleChange} className="form-input w-full" />

        <select name="gender" onChange={handleChange} className="form-input w-full appearance-none">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button className="btn-primary w-full">
          Register
        </button>

        <div className="text-sm text-center">
          <span className="muted-link">Already have an account? </span>
          <Link to="/login" className="muted-link">Login</Link>
        </div>
      </form>

    </div>
  );
};

export default Register;