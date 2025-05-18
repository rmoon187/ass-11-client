import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { useTheme } from "../provider/ThemeProvider";

const Banner = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden pt-16">
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
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
          isDarkMode ? "bg-black bg-opacity-60" : "bg-black bg-opacity-50"
        }`}
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
            className={`px-6 py-3 rounded-md text-lg font-semibold transition-colors shadow-lg ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-green-600 hover:text-white text-green-600"
            }`}
          >
            Explore Now
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;