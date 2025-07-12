import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name] && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await login(form);
      if (res.status === 200) {
        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        const serverError = err.response.data.error;
        if (serverError.toLowerCase().includes("email")) {
          setErrors({ email: serverError });
        } else {
          setErrors({ password: serverError });
        }
      } else {
        alert("Something went wrong");
      }
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:4000/api/google", "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black font-[Poppins] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-gray-700 shadow-xl rounded-xl p-8 space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Sign in to your account</h2>
        <p className="text-center text-gray-400 text-sm">Enter your credentials below</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition text-white font-semibold rounded-md shadow-md"
          >
            Login
          </button>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gray-600" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="h-px flex-1 bg-gray-600" />
          </div>

          <button
            type="button"
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 bg-white text-black rounded-md shadow-md hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
