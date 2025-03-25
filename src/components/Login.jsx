import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
    const goTo = location.state || '/'

    const { handleGoogleLogin, handleLogin } = useContext(AuthContext);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password)
            .then(() => {
                Swal.fire("Success", "Login successful!", "success");
                navigate(goTo);
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    const handleGoogleSignIn = () => {
        handleGoogleLogin()
            .then(() => {
                Swal.fire("Success", "Login successful!", "success");
                navigate(goTo);
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className=" max-w-[1400px] mx-auto py-20 bg-gray-100">
            <div className="bg-white w-[450px] mx-auto shadow-lg p-10 rounded-lg  ">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block font-medium text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg text-white font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Create an account
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="w-full border-gray-300" />
                    <span className="px-2 text-gray-500">Or</span>
                    <hr className="w-full border-gray-300" />
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 font-semibold flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-700 hover:text-white transition"
                >
                    <FcGoogle className="mr-2 text-red-500" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
