import { NavLink } from "react-router-dom";
import logo from "../assets/software.png";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import bannerImage from "../assets/banner.jpg";
import { div } from "framer-motion/client";

const Navbar = () => {
    const { user, handleLogOut } = useContext(AuthContext);

    return (
        <header className="bg-gradient-to-r   mx-auto from-blue-500 to-green-500 shadow-md">
            {/* Navigation Bar */}
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="RecomHub Logo" className="h-10" />
                        <span className="text-white text-2xl font-bold">RecomHub</span>
                    </NavLink>

                    {/* Navigation */}
                    <nav className="w-full md:w-auto flex justify-center flex-grow">
                        <ul className="flex flex-col md:flex-row md:space-x-6 text-white text-lg">
                            <li className="md:ml-[-20px]">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                                            ? "bg-white text-green-600 font-semibold"
                                            : "hover: hover:text-green-600 hover:scale-105"
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="md:ml-[-20px]">
                                <NavLink
                                    to="/allQueries"
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                                            ? "bg-white text-green-600 font-semibold"
                                            : "hover:bg-white hover:text-green-600 hover:scale-105"
                                        }`
                                    }
                                >
                                    Queries
                                </NavLink>
                            </li>
                            {user && (
                                <>
                                    <li className="md:ml-[-20px]">
                                        <NavLink
                                            to="/recommendations"
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                                                    ? "bg-white text-green-600 font-semibold"
                                                    : "hover:bg-white hover:text-green-600 hover:scale-105"
                                                }`
                                            }
                                        >
                                            Recommendations For Me
                                        </NavLink>
                                    </li>
                                    <li className="md:ml-[-20px]">
                                        <NavLink
                                            to="/my-queries"
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                                                    ? "bg-white text-green-600 font-semibold"
                                                    : "hover:bg-white hover:text-green-600 hover:scale-105"
                                                }`
                                            }
                                        >
                                            My Queries
                                        </NavLink>
                                    </li>
                                    <li className="md:ml-[-20px]">
                                        <NavLink
                                            to="/my-recommendations"
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isActive
                                                    ? "bg-white text-green-600 font-semibold"
                                                    : "hover:bg-white hover:text-green-600 hover:scale-105"
                                                }`
                                            }
                                        >
                                            My Recommendations
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* Authentication Button */}
                    <div className="flex justify-end w-full md:w-auto">
                        {user ? (
                            <div className="flex gap-3">
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/40"}
                                    alt="User"
                                    className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-blue-400"
                                />
                                <button
                                    onClick={handleLogOut}
                                    className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300"
                            >
                                Log-in
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className="relative h-[400px] overflow-hidden">
                <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-5xl font-bold mb-4">Discover the Best Products</h1>
                    <p className="text-white text-xl mb-8">
                        Get personalized recommendations and share your insights with the community.
                    </p>
                    <NavLink
                        to="/queries"
                        className="bg-white text-green-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                        Explore Now
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
