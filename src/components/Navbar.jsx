import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/software.png";
import bannerImage from "../assets/banner.jpg";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../provider/ThemeProvider";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

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

          {/* Desktop Navigation (lg and up) */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <ul className="flex space-x-6 text-white text-lg">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md transition-all duration-300 ${
                        isActive
                          ? "bg-white text-green-600 font-semibold"
                          : "hover:bg-white hover:text-green-600 hover:scale-105"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allQueries"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md transition-all duration-300 ${
                        isActive
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
                    <li>
                      <NavLink
                        to="/recommendations"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md transition-all duration-300 ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600 hover:scale-105"
                          }`
                        }
                      >
                        Recommendations for me
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-queries"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md transition-all duration-300 ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600 hover:scale-105"
                          }`
                        }
                      >
                        My Queries
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-recommendations"
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md transition-all duration-300 ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600 hover:scale-105"
                          }`
                        }
                      >
                        My recommendations
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              
              {/* Dark mode toggle button - moved outside the ul */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    className="w-6 h-6 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
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
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
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

          {/* Tablet Navigation (md) - Simplified version */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <ul className="flex space-x-2 text-white">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-2 py-1 rounded-md text-sm ${
                        isActive
                          ? "bg-white text-green-600 font-semibold"
                          : "hover:bg-white hover:text-green-600"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allQueries"
                    className={({ isActive }) =>
                      `block px-2 py-1 rounded-md text-sm ${
                        isActive
                          ? "bg-white text-green-600 font-semibold"
                          : "hover:bg-white hover:text-green-600"
                      }`
                    }
                  >
                    Queries
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink
                        to="/recommendations"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded-md text-sm ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600"
                          }`
                        }
                      >
                        Recs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-queries"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded-md text-sm ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600"
                          }`
                        }
                      >
                        My Qs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-recommendations"
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded-md text-sm ${
                            isActive
                              ? "bg-white text-green-600 font-semibold"
                              : "hover:bg-white hover:text-green-600"
                          }`
                        }
                      >
                        My recs
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              
              {/* Dark mode toggle button for tablet */}
              <button
                onClick={toggleDarkMode}
                className="p-1 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-20"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </nav>

            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                />
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-white text-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Log-in
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button (sm) */}
          <div className="md:hidden flex items-center gap-4">
            {/* Dark mode toggle button for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-20"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            
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

        {/* Mobile Navigation (sm) */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <nav className="bg-blue-600 rounded-lg mt-4 p-4 shadow-xl z-50 relative">
            <ul className="space-y-2 text-white text-lg">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-white text-green-600 font-semibold"
                        : "hover:bg-white hover:text-green-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allQueries"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-white text-green-600 font-semibold"
                        : "hover:bg-white hover:text-green-600"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Queries
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/recommendations"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-all duration-300 ${
                          isActive
                            ? "bg-white text-green-600 font-semibold"
                            : "hover:bg-white hover:text-green-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Recommendations for me
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-queries"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-all duration-300 ${
                          isActive
                            ? "bg-white text-green-600 font-semibold"
                            : "hover:bg-white hover:text-green-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      My Queries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-recommendations"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition-all duration-300 ${
                          isActive
                            ? "bg-white text-green-600 font-semibold"
                            : "hover:bg-white hover:text-green-600"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
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

      {/* Banner Section - Responsive */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <motion.img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4"
          >
            Discover the Best Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 max-w-2xl"
          >
            Get personalized recommendations and share your insights with the
            community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <NavLink
              to="/allQueries"
              className="bg-white text-green-600 px-4 py-2 sm:px-6 sm:py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              Explore Now
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;