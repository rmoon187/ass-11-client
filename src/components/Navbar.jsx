import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/software.png";
import bannerImage from "../assets/banner.jpg";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const { user, handleLogOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-blue-500 to-green-500 shadow-md">
            {/* Navigation Bar */}
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="RecomHub Logo" className="h-10" />
                        <span className="text-white text-2xl font-bold">RecomHub</span>
                    </NavLink>

                    {/* Desktop Navigation and Auth */}
                    <div className="hidden md:flex items-center space-x-6">
                        <nav>
                            <ul className="flex space-x-6 text-white text-lg">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600 hover:scale-105"}`}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/allQueries"
                                        className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600 hover:scale-105"}`}
                                    >
                                        Queries
                                    </NavLink>
                                </li>
                                {user && (
                                    <>
                                        <li>
                                            <NavLink to="/recommendations" className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600 hover:scale-105"}`}>
                                                Recommendations For Me
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/my-queries" className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600 hover:scale-105"}`}>
                                                My Queries
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/my-recommendations" className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600 hover:scale-105"}`}>
                                                My Recommendations
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/40"}
                                    alt="User"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                                />
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300"
                            >
                                Log-in
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user && (
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                            />
                        )}
                        <button
                            className="text-white focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
                    <nav className="bg-blue-600 rounded-lg mt-4 p-4 shadow-xl z-50 relative">
                        <ul className="space-y-2 text-white text-lg">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600"}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/allQueries"
                                    className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600"}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Queries
                                </NavLink>
                            </li>
                            {user && (
                                <>
                                    <li>
                                        <NavLink to="/recommendations"
                                            className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600"}`}
                                            onClick={() => setIsOpen(false)}>
                                            Recommendations For Me
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-queries"
                                            className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600"}`}
                                            onClick={() => setIsOpen(false)}>
                                            My Queries
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/my-recommendations"
                                            className={({ isActive }) => `block px-3 py-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-green-600 font-semibold" : "hover:bg-white hover:text-green-600"}`}
                                            onClick={() => setIsOpen(false)}>
                                            My Recommendations
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogOut();
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {!user && (
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="block px-3 py-2 rounded-md bg-white text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Log-in
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Banner Section */}
            <div className="relative h-[350px] overflow-hidden">
                <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Discover the Best Products</h1>
                    <p className="text-white text-lg md:text-xl mb-8">
                        Get personalized recommendations and share your insights with the community.
                    </p>
                    <NavLink
                        to="/queries"
                        className="bg-white text-green-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                        Explore Now
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;