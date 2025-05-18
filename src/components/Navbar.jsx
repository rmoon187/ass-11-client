import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/software.png";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../provider/ThemeProvider";

const Navbar = () => {
  const { user, handleLogOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Common link styles
  const linkStyles = (isActive) => 
    `block px-3 py-2 rounded-md transition-all duration-300 ${
      isActive
        ? "bg-white text-green-600 font-semibold"
        : "hover:bg-white hover:text-green-600"
    }`;

  // Mobile link styles
  const mobileLinkStyles = (isActive) => 
    `block px-4 py-3 rounded-md text-lg transition-colors ${
      isActive
        ? "bg-white text-green-600 font-semibold"
        : "hover:bg-white hover:text-green-600"
    }`;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? isDarkMode
          ? "bg-gray-900/50 backdrop-blur-sm shadow-lg"
          : "bg-gradient-to-r from-blue-500/60 to-green-500/60 backdrop-blur-sm shadow-lg"
        : isDarkMode
          ? "bg-gray-900/50 backdrop-blur-sm"
          : "bg-gradient-to-r from-blue-500 to-green-500"
    }`}>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="RecomHub Logo" className="h-10" />
            <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-white"}`}>
              RecomHub
            </span>
          </NavLink>

          {/* Desktop Navigation (lg and up) */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <ul className="flex space-x-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => 
                      `${linkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allQueries"
                    className={({ isActive }) => 
                      `${linkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
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
                          `${linkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
                        }
                      >
                        Recommendations
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-queries"
                        className={({ isActive }) => 
                          `${linkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
                        }
                      >
                        My Queries
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-recommendations"
                        className={({ isActive }) => 
                          `${linkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
                        }
                      >
                        My Recs
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              
              {/* Dark mode toggle button */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full focus:outline-none transition-colors ${
                  isDarkMode 
                    ? "text-yellow-300 hover:bg-gray-700" 
                    : "text-gray-800 hover:bg-gray-200"
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                  />
                  <span className={`${isDarkMode ? "text-white" : "text-white"}`}>
                    {user.displayName || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogOut}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isDarkMode
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-white hover:bg-green-600 hover:text-white text-green-600"
                }`}
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Dark mode toggle button for mobile */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full focus:outline-none ${
                isDarkMode 
                  ? "text-yellow-300 hover:bg-gray-700" 
                  : "text-gray-800 hover:bg-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user && (
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
              />
            )}
            
            <button
              className={`focus:outline-none ${
                isDarkMode ? "text-white" : "text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden mt-4 overflow-hidden rounded-lg shadow-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => 
                      `${mobileLinkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
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
                      `${mobileLinkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
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
                          `${mobileLinkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        Recommendations
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-queries"
                        className={({ isActive }) => 
                          `${mobileLinkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
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
                          `${mobileLinkStyles(isActive)} ${isDarkMode ? "hover:bg-gray-700" : ""}`
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
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                          isDarkMode
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
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
                      className={`block px-4 py-3 rounded-md transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;