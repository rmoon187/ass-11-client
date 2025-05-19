import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { handleRegister, handleUpdate, setUser, handleGoogleLogin } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Error",
        "Password must contain uppercase, lowercase letters, and be at least 6 characters long.",
        "error"
      );
      return;
    }

    handleRegister(email, password)
      .then((result) => {
        const user = result.user;
        return handleUpdate(name, photoURL).then(() => {
          setUser({
            ...user,
            displayName: name,
            photoURL: photoURL,
          });
        });
      })
      .then(() => {
        Swal.fire("Success", "Registration successful!", "success");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    handleGoogleLogin()
      .then(() => {
        Swal.fire("Success", "Registration successful!", "success");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="max-w-[1400px] mx-auto py-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 w-[450px] mx-auto shadow-lg p-10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Register Easily!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Photo URL
            </label>
            <input
              type="url"
              placeholder="Enter Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <label className="block font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600 dark:text-gray-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
        <div className="flex items-center my-6">
          <hr className="w-full border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500 dark:text-gray-400">Or</span>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 font-semibold flex items-center justify-center border border-gray-400 dark:border-gray-600 rounded-full text-gray-700 dark:text-white hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white transition"
        >
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
