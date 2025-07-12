import { useNavigate } from "react-router";
import { signup } from "../services/auth";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name] && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Minimum 8 characters required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/.test(form.password)
    ) {
      errors.password = "Must include uppercase, lowercase, number, and special char";
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.avatar) formData.append("avatar", form.avatar);

      const res = await signup(formData);

      if (res.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/signin");
      }
    } catch (e) {
      if (e.response?.status === 400) {
        alert("Email already exists");
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-zinc-900 flex items-center justify-center px-4 font-[Poppins]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-black/60 backdrop-blur-lg border border-gray-800 shadow-xl rounded-2xl p-10 text-white space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-400">Get started by filling the information below</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="name" className="text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="avatar" className="text-sm text-gray-300">Profile Photo</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:bg-indigo-900 file:text-indigo-300 hover:file:bg-indigo-800"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition text-white font-semibold shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-indigo-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
